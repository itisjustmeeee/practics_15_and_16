(() => {
    'use strict';

    const form = document.getElementById('contactForm');
    const inputs = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };

    const errors = {
        name: document.getElementById('name-error'),
        phone: document.getElementById('phone-error'),
        email: document.getElementById('email-error'),
        message: document.getElementById('message-error')
    }

    const hints = {
        name: document.getElementById('name-hint'),
        phone: document.getElementById('phone-hint'),
        email: document.getElementById('email-hint'),
        message: document.getElementById('message-hint')
    }

    inputs.phone.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) value = value.slice(0, 11);
        if (value.startsWith('8')) value = '7' + value.slice(1);
        if (!value.startsWith('7') && value.length > 0) value = '7' + value;

        let formatted = '+7 ';
        if (value.length > 1) formatted += '(' + value.slice(1, 4);
        if (value.length >= 4) formatted += ') ';
        if (value.length > 4) formatted += value.slice(4, 7);
        if (value.length > 7) formatted += '-' + value.slice(7, 9);
        if (value.length > 9) formatted += '-' + value.slice(9, 11);

        e.target.value = formatted;
    });

    inputs.phone.addEventListener('focus', () => {
        if (!inputs.phone.value) inputs.phone.value = '+7 ';
    });

    inputs.phone.addEventListener('blur', () => {
        if (inputs.phone.value === '+7 ') inputs.phone.value = '';
    });

    form.addEventListener('submit', function (e) {

        e.preventDefault();
        let isValid = true;

        Object.values(errors).forEach (el => {
            el.classList.add('visually-hidden');
            el.textContent = '';
        });
        form.classList.remove('was-validated');

        if (!inputs.name.value.trim()){
            showError('name', 'Введите корректное имя (оно может содержать только рус/англ бкувы и дефисы)');
            isValid = false;
        }
                
        const phoneClean = inputs.phone.value.replace(/\D/g, '');
        if (phoneClean.length !== 11 || !phoneClean.startsWith('7')) {
            showError('phone', 'Введите телефон в формате +7 (999) 123-45-67');
            isValid = false;
        }

        if (!inputs.email.validity.valid) {
            showError('email', 'Введите корректный email формата: example@gmail.com (можно также mail и yandex)');
            isValid = false;
        }

        if (inputs.message.value.trim().length < 10) {
            showError('message', 'Сообщение должно быть не менее 10 символов');
            isValid = false;
        }

        if (isValid) {
            const data = {
                name: inputs.name.value.trim(),
                phone: inputs.phone.value.trim(),
                email: inputs.email.value.trim(),
                message: inputs.message.value.trim()
            };

            document.getElementById('modalMessage').innerHTML = `Спасибо, <strong>${data.name}</strong>!<br>Ваше сообщение успешно отправлено. Я отвечу вам позже XD<br>
            <small class="text-muted">Телефон: ${data.phone}</small>`

            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            form.reset();
            inputs.phone.value = '';
        } else {
            form.classList.add('was-validated');
        }
    });

    function showError(field, message) {
        errors[field].textContent = message;
        errors[field].classList.remove('visually-hidden');
    }

})();