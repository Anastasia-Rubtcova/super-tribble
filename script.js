const API_BASE_URL = 'http://localhost:5000';

// fetch(`${API_BASE_URL}/transactions`)
//     .then(response => response.json())
//     .then(data => renderTransactionList(data))

function renderTransactionList(data) {
    const containerTransaction = document.createElement('div');
    containerTransaction.classList.add('expense__transactions-list');


    data.forEach(transaction => {
        const isPending = transaction.status === 'pending'
        const transactionWrapp = document.createElement('div');
        transactionWrapp.classList.add('expense__transaction');

        const transactionArrow = document.createElement('div');
        transactionArrow.classList.add('expense__transaction-arrow');
        transactionArrow.innerHTML = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none"
    xmlns = "http://www.w3.org/2000/svg" >
                                        <path d="M9.87506 6.28125L6.50006 9.65625L3.12506 6.28125" stroke="#E53E3E"
                                            stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6.49982 9.1875L6.49982 2.34375" stroke="#E53E3E" stroke-width="1.125"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg > `
        const paths = transactionArrow.querySelectorAll("path");

        const transactionDetails = document.createElement('div');
        transactionDetails.classList.add('expense__transaction-details');

        const transactionName = document.createElement('span');
        transactionName.classList.add('expense__transaction-name');
        transactionName.textContent = transaction.name;

        const transactionTime = document.createElement('span');
        transactionTime.classList.add('expense__transaction-time');
        transactionTime.textContent = formatDate(transaction.date);

        const transactionAmount = document.createElement('span');
        transactionAmount.classList.add('expense__transaction-amount');
        transactionAmount.textContent = transaction.amount;
        if (!isPending) {
            if (transaction.amount > 0) {
                paths.forEach(path => {
                    path.setAttribute('stroke', '#48BB78');
                });
                transactionArrow.style.borderColor = "#48BB78"
                transactionArrow.style.rotate = "180deg"
                transactionAmount.style.color = "#48BB78"
            } else {
                transactionAmount.style.color = "#e53e3e"
                transactionArrow.style.borderColor = "#e53e3e"
            }
        } else {
            transactionArrow.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_110)">
                    <path d="M7.50004 12.75C8.14437 12.75 8.66671 12.2276 8.66671 11.5833C8.66671 10.939 8.14437 10.4166 7.50004 10.4166C6.85571 10.4166 6.33337 10.939 6.33337 11.5833C6.33337 12.2276 6.85571 12.75 7.50004 12.75Z" fill="#A0AEC0" />
                    <path d="M7.50004 2.25C6.85837 2.25 6.33337 2.775 6.33337 3.41667V8.08333C6.33337 8.725 6.85837 9.25 7.50004 9.25C8.14171 9.25 8.66671 8.725 8.66671 8.08333V3.41667C8.66671 2.775 8.14171 2.25 7.50004 2.25Z" fill="#A0AEC0" />
                </g>
                <defs>
                    <clipPath id="clip0_0_110">
                        <rect width="14" height="14" fill="white" transform="translate(0.500061 0.5)" />
                    </clipPath>
                </defs>
            </svg>`
            transactionAmount.textContent = "В ожидании"
            transactionAmount.style.color = "#2d3748"
            transactionArrow.style.borderColor = "#a0aec0"
        }

        transactionDetails.append(transactionName, transactionTime);
        transactionWrapp.append(transactionArrow, transactionDetails, transactionAmount)

        containerTransaction.append(transactionWrapp)
    });
    document.getElementById("transactions").append(containerTransaction)
}

function formatDate(dateString) {
    const date = new Date(dateString)

    let dateNumber = date.getDate()
    let year = date.getFullYear()
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    let month = monthNames[date.getMonth()]

    return `${dateNumber} ${month} ${year} года, в ${hours}:${minutes} часов`
}


// fetch(`${API_BASE_URL}/invoices`)
//     .then(response => response.json())
//     .then(data => renderInvoicesList(data))

function renderInvoicesList(data) {
    const invoicesList = document.getElementById("transactions__list")

    data.forEach(invoice => {
        const invoicesItem = document.createElement('div');
        invoicesItem.classList.add('transactions__item');

        const invoicesDetails = document.createElement('div');
        invoicesDetails.classList.add('transactions__details');

        const invoicesAmount = document.createElement('div');
        invoicesAmount.classList.add('transactions__amount');

        const invoicesDate = document.createElement('span');
        invoicesDate.classList.add('transactions__date');
        invoicesDate.textContent = formatInvoiceDate(invoice.date)

        const invoicesId = document.createElement('span');
        invoicesId.classList.add('transactions__id');
        invoicesId.textContent = "#" + invoice.id;

        const invoicesSum = document.createElement('span');
        invoicesSum.classList.add('transactions__sum');
        invoicesSum.textContent = invoice.amount;

        const invoicesPDF = document.createElement('a');
        invoicesPDF.classList.add('transactions__pdf');
        invoicesPDF.textContent = "PDF"
        invoicesPDF.href = "#"


        invoicesDetails.append(invoicesDate, invoicesId)
        invoicesAmount.append(invoicesSum, invoicesPDF)
        invoicesItem.append(invoicesDetails, invoicesAmount)
        invoicesList.append(invoicesItem)
    })
    function formatInvoiceDate(dateString) {
        const date = new Date(dateString)

        let dateNumber = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear()

        let monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
        let month = monthNames[date.getMonth()]

        return `${month}, ${dateNumber}, ${year}`
    }
}

// fetch(`${API_BASE_URL}/accounts`)
//     .then(response => response.json())
//     .then((data) => {
//         document.getElementById("salary").textContent = data[0].balance;
//         document.getElementById("frilance").textContent = data[1].balance;
//     })

fetch(`${API_BASE_URL}/invoice-details`)
    .then(response => response.json())
    .then((data) => renderInvoices(data))

function renderInvoices(invoices) {
    const container = document.querySelector('.invoice__list');
    container.innerHTML = ''; // очищаем старые данные

    invoices.forEach((invoice) => {
        const item = document.createElement('div');
        item.classList.add('invoice__item');

        const content = document.createElement('div');
        content.classList.add('invoice__content');

        const name = document.createElement('h3');
        name.classList.add('invoice__name');
        name.textContent = invoice.fullName;

        const company = document.createElement('p');
        company.classList.add('invoice__data');
        company.textContent = `Название компании: ${invoice.company}`;

        const email = document.createElement('p');
        email.classList.add('invoice__data');
        email.textContent = `Адрес электронной почты: ${invoice.email}`;

        const vat = document.createElement('p');
        vat.classList.add('invoice__data');
        vat.textContent = `Номер НДС: ${invoice.vatNumber}`;

        content.append(name, company, email, vat);

        const actions = document.createElement('div');
        actions.classList.add('invoice__actions');

        // Кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('invoice__delete');

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('invoice__delete-icon');

        deleteIcon.innerHTML = `<svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_0_190)">
                                                <path
                                                    d="M3.75 12.375C3.75 13.0625 4.3125 13.625 5 13.625H10C10.6875 13.625 11.25 13.0625 11.25 12.375V6.125C11.25 5.4375 10.6875 4.875 10 4.875H5C4.3125 4.875 3.75 5.4375 3.75 6.125V12.375ZM11.25 3H9.6875L9.24375 2.55625C9.13125 2.44375 8.96875 2.375 8.80625 2.375H6.19375C6.03125 2.375 5.86875 2.44375 5.75625 2.55625L5.3125 3H3.75C3.40625 3 3.125 3.28125 3.125 3.625C3.125 3.96875 3.40625 4.25 3.75 4.25H11.25C11.5937 4.25 11.875 3.96875 11.875 3.625C11.875 3.28125 11.5937 3 11.25 3Z"
                                                    fill="#E53E3E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_0_190">
                                                    <rect width="15" height="15" fill="white"
                                                        transform="translate(0 0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>`;
        const deleteText = document.createElement('span');
        deleteText.classList.add('invoice__delete-text');
        deleteText.textContent = 'УДАЛИТЬ';
        deleteBtn.addEventListener('click', () => {
            const modalDelete = document.getElementById("modalDelete");
            modalDelete.style.display = "block";

            const cancelButton = document.querySelectorAll('.modal-content-button')[0];
            const deleteButton = document.querySelectorAll('.modal-content-button')[1];
            const crossButton = document.querySelectorAll('.modal-content-svg')[0];

            deleteButton.addEventListener('click', () => {
                fetch(`${API_BASE_URL}/invoice-details/${invoice.id}`, {
                    method: "DELETE"
                })
                modalDelete.style.display = "none";
            })
            cancelButton.addEventListener('click', () => {
                modalDelete.style.display = "none";
            })
            crossButton.addEventListener('click', () => {
                modalDelete.style.display = "none";
            })
            window.onclick = (e) => {
                if (e.target == modalDelete) {
                    modalDelete.style.display = "none"
                }
            }
        })

        deleteBtn.append(deleteIcon, deleteText);

        // Кнопка редактирования
        const editBtn = document.createElement('button');
        editBtn.classList.add('invoice__edit');
        editBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_0_191)">
                                            <path
                                                d="M1.99988 9.23V10.75C1.99988 10.89 2.10988 11 2.24988 11H3.76988C3.83488 11 3.89988 10.975 3.94488 10.925L9.40488 5.47L7.52988 3.595L2.07488 9.05C2.02488 9.1 1.99988 9.16 1.99988 9.23ZM10.8549 4.02C11.0499 3.825 11.0499 3.51 10.8549 3.315L9.68488 2.145C9.48988 1.95 9.17488 1.95 8.97988 2.145L8.06488 3.06L9.93988 4.935L10.8549 4.02Z"
                                                fill="#2D3748" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_191">
                                                <rect width="12" height="12" fill="white"
                                                    transform="translate(0.499878 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>`;

        actions.append(deleteBtn, editBtn);

        item.append(content, actions);
        container.appendChild(item);

        editBtn.addEventListener('click', () => {

            const modal = document.getElementById("modalEdit");
            modal.style.display = "block";

            const company = document.getElementById("company")
            const mail = document.getElementById("mail")
            const nds = document.getElementById("nds")
            const name = document.getElementById("name")

            company.value = ''
            mail.value = ''
            nds.value = ''
            name.value = ''

            fetch(`${API_BASE_URL}/invoice-details/${invoice.id}`)
                .then(response => response.json())
                .then((data) => {
                    company.value = data.company || ''
                    mail.value = data.email || ''
                    nds.value = data.vatNumber || ''
                    name.value = data.fullName || ''
                })

            const cancelButton = document.querySelectorAll('.modal-content-button')[2];
            const saveButton = document.querySelectorAll('.modal-content-button')[3];
            const crossButton = document.querySelectorAll('.modal-content-svg')[1];
            const errorBlock = document.getElementById('error')

            saveButton.addEventListener('click', () => {
                errorBlock.textContent = ''
                const invoiceUpdate = {
                    fullName: name.value.trim(),
                    company: company.value.trim(),
                    email: mail.value.trim(),
                    vatNumber: nds.value.trim(),
                }

                const errors = validateForm(invoiceUpdate)

                if(errors.length > 0) {
                    errorBlock.innerHTML = errors.join('<br>');
                    return
                }

                fetch(`${API_BASE_URL}/invoice-details/${invoice.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invoiceUpdate)
                })
                    .then((response) => {
                        if (!response.ok) {
                            errorBlock.textContent = 'Возникла ошибка при обновлении данных'
                        } else {
                            modal.style.display = "none";
                        }
                    })
            })

            cancelButton.addEventListener('click', () => {
                modal.style.display = "none";
            })
            crossButton.addEventListener('click', () => {
                modal.style.display = "none";
            })
            window.onclick = (e) => {
                if (e.target == modal) {
                    modal.style.display = "none"
                }
            }
        })
    });
}

function validateForm(data) {
    let errors = []

    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    if (!data.fullName) {
        errors.push("Имя обязательно")
    } else if (!nameRegex.test(data.fullName)) {
        errors.push("Некорректное имя")
    }

    if (!data.company) {
        errors.push("Название компании обязательно")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        errors.push("Адрес email обязательно")
    } else if (!emailRegex.test(data.email)) {
        errors.push("Некорректный адрес email")
    }

    const vatRegex = /^[A-Za-z]{2,3}[0-9]{7,9}$/;
    if (!data.vatNumber) {
        errors.push("НДС номер обязательно")
    } else if (!vatRegex.test(data.vatNumber)) {
        errors.push("Некорректный НДС номер")
    }

    return errors
}