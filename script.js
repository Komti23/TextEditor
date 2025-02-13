function toggleFormat(command) {
    document.execCommand(command, false, null);
    updateToolbar();
}

function changeColor(command, value) {
    document.execCommand(command, false, value);
}

function updateFontSize() {
    const fontSize = document.getElementById("fontSizeSlider").value;
    document.getElementById("fontSizeValue").textContent = fontSize;
    document.execCommand('fontSize', false, fontSize);
}

function updateToolbar() {
    const commands = ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight'];
    commands.forEach(cmd => {
        document.getElementById(cmd).classList.toggle('active', document.queryCommandState(cmd));
    });
}

function insertImage() {
    let url = prompt("Введите URL изображения:");
    if (url) {
        document.execCommand('insertImage', false, url);
    }
}

function insertLocalImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            document.execCommand('insertImage', false, e.target.result);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function insertLink() {
    let url = prompt("Введите URL ссылки:");
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function saveFile() {
    let content = document.getElementById('editor').innerHTML;
    let doc = new docx.Document({
        sections: [{
            properties: {},
            children: [new docx.Paragraph({ text: content.replace(/<[^>]+>/g, '') })]
        }]
    });
    docx.Packer.toBlob(doc).then(blob => {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'document.docx';
        a.click();
    }).catch(e => console.error("Ошибка сохранения файла:", e));
}

function printDocument() {
    const content = document.getElementById("editor").innerHTML;
    const printWindow = window.open("", "Print", "height=600,width=800");
    printWindow.document.write("<html><head><title>Печать</title></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.getElementById('editor').classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'светлая' : 'тёмная';
    document.getElementById('theme-toggle').textContent = `Переключить на ${currentTheme} тему`;
}