document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById("saveBtn");
    const input = document.getElementById('recordText');
    const list = document.getElementById('recordsList');

    const saved = localStorage.getItem('records');
    if (saved){
        list.innerHTML = saved;
    }

    function addRecord(text) {
        const newRecord = document.createElement('p');
        newRecord.className = 'card-text';

        newRecord.innerHTML = `<span>${text}<span>
        <button class="btn btn-outline-danger delete-btn">Удалить</button>`;

        list.insertBefore(newRecord, list.lastChild);

        localStorage.setItem('records', list.innerHTML);
    }

    saveBtn.addEventListener('click', function() {
        const text = input.value.trim();

        if (text){
            addRecord(text);
            input.value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('addRecordModal'));
            modal.hide();
        }
        else{
            alert('введите текст записи!');
        }
    });

    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const record = e.target.closest('p');
            if (record) {
                record.remove();
                localStorage.setItem('records', list.innerHTML);
            }
        }
    });
});


document.getElementById('feedBackForm').addEventListener('submit', function(e){
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    console.log('сообщение: ', data);
    alert('Спасибо! Сообщение отправлено');
    this.reset();
});