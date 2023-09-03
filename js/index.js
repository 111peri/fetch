const form = document.getElementById('userForm');

function getFormValue(event) {
    event.preventDefault();

    const fields = document.querySelectorAll('input, select, textarea');

    const formData = {};

    fields.forEach(field => {
        const { name, value } = field;
        formData[name] = value;
    });

    console.log(formData);
}

form.addEventListener('submit', getFormValue);



//2

function updateProductDescription() {
    // Получите значение из поля ввода
    const newDescription = document.getElementById('productDescription').value;

    // Создайте объект с данными, которые нужно обновить
    const dataToUpdate = {
        productDescription: newDescription
    };

    // Отправьте PATCH-запрос на сервер
    fetch(' https://jsonplaceholder.typicode.com/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        })
        .then(response => response.json())
        .then(data => {
            // Обработка ответа от сервера
            if (data.success) {
                document.getElementById('responseMessage').textContent = 'Данные успешно обновлены';
            } else {
                document.getElementById('responseMessage').textContent = 'Произошла ошибка при обновлении данных';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('responseMessage').textContent = 'Произошла ошибка при обновлении данных';
        });
}





//3

function deleteItem(itemId) {
    //запрос на сервер
    fetch(`/api/items/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении элемента');
            }
            return response.json();
        })
        .then(data => {
            // Обработайте ответ от сервера
            if (data.success) {
                // Успешное удаление: удалите элемент из списка
                const listItem = document.querySelector(`#itemList li button[data-id="${itemId}"]`).parentNode;
                listItem.remove();
                document.getElementById('responseMessage').textContent = 'Элемент успешно удален';
            } else {
                document.getElementById('responseMessage').textContent = 'Произошла ошибка при удалении элемента';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('responseMessage').textContent = 'Произошла ошибка при удалении элемента';
        });
}