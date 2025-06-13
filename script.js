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

// fetch(`${API_BASE_URL}/invoice-details`)
//     .then(response => response.json())
//     .then((data) => renderInvoices(data))

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

                if (errors.length > 0) {
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

fetch(`${API_BASE_URL}/payment-methods`)
    .then(response => response.json())
    .then((data) => renderCards(data))

function renderCards(cards) {
    const container = document.querySelector(".payment");
    container.innerHTML = '';

    const header = document.createElement('div');
    header.classList.add('payment__header');

    const title = document.createElement('span');
    title.classList.add('payment__title');
    title.textContent = "Способ оплаты";

    const button = document.createElement('button');
    button.classList.add('payment__button');
    button.textContent = "ДОБАВИТЬ";

    header.append(title, button);

    const input = document.createElement('div');
    input.classList.add('payment__input');


    cards.forEach((card) => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('payment__form-container');

        const formSVG = document.createElement('div');
        if (card.type === "Visa") {
            formSVG.innerHTML = `<svg width="21" height="15" viewBox="0 0 21 15" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.63156" cy="7.49999" r="6.63158" fill="#EB001B" />
                                    <circle cx="14.3684" cy="7.49999" r="6.63158" fill="#F79E1B" />
                                </svg>`
        } else if (card.type === "Mastercard") {
            formSVG.innerHTML = `<svg width="25" height="9" viewBox="0 0 25 9" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.6707 2.96349C12.6568 4.15055 13.6529 4.81298 14.4033 5.20684C15.1743 5.61099 15.4333 5.87013 15.4303 6.23147C15.4245 6.78459 14.8153 7.02862 14.2452 7.03812C13.2505 7.05475 12.6722 6.74889 12.2124 6.51753L11.8541 8.32341C12.3154 8.55247 13.1695 8.75217 14.0553 8.76087C16.1344 8.76087 17.4947 7.65543 17.5021 5.94145C17.5102 3.76625 14.7086 3.64579 14.7277 2.67348C14.7344 2.37871 14.9955 2.06408 15.5679 1.98406C15.8511 1.94368 16.6332 1.91274 17.5197 2.35252L17.8677 0.605286C17.391 0.418253 16.7781 0.239136 16.0152 0.239136C14.0583 0.239136 12.6818 1.35962 12.6707 2.96349ZM21.2114 0.389687C20.8318 0.389687 20.5118 0.628245 20.3691 0.99433L17.399 8.63249H19.4766L19.8901 7.40183H22.429L22.6688 8.63249H24.4999L22.902 0.389687H21.2114ZM21.502 2.61641L22.1016 5.7116H20.4595L21.502 2.61641ZM10.1518 0.389687L8.51412 8.63249H10.4938L12.1307 0.389687H10.1518ZM7.22297 0.389687L5.16227 6.00003L4.32872 1.22966C4.23091 0.697187 3.84466 0.389687 3.41573 0.389687H0.04704L-6.10352e-05 0.629037C0.691513 0.790671 1.47723 1.0514 1.9532 1.33033C2.24451 1.50067 2.32768 1.64964 2.4233 2.05458L4.00208 8.63249H6.09444L9.30204 0.389687H7.22297Z"
                                        fill="#3182CE" />
                                </svg>`
        }

        const cardNumber = document.createElement('input');
        cardNumber.classList.add("payment__form")
        cardNumber.placeholder = card.number;
        cardNumber.value = card.number;
        cardNumber.maxlength = "19";
        cardNumber.disabled = true;

        const cardSVG1 = document.createElement("button");
        cardSVG1.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_289)">
                                        <path
                                            d="M2.00009 9.23V10.75C2.00009 10.89 2.11009 11 2.25009 11H3.77009C3.83509 11 3.90009 10.975 3.94509 10.925L9.40509 5.47L7.53009 3.595L2.07509 9.05C2.02509 9.1 2.00009 9.16 2.00009 9.23ZM10.8551 4.02C11.0501 3.825 11.0501 3.51 10.8551 3.315L9.68509 2.145C9.49009 1.95 9.17509 1.95 8.98009 2.145L8.06509 3.06L9.94009 4.935L10.8551 4.02Z"
                                            fill="#2D3748" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_289">
                                            <rect width="12" height="12" fill="white"
                                                transform="translate(0.500092 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>`

        const cardSVG2 = document.createElement("button");
        const cardSVG3 = document.createElement("button");

        formContainer.append(formSVG, cardNumber, cardSVG1, cardSVG2, cardSVG3);
        input.append(formContainer);

        cardSVG1.addEventListener('click', () => {
            cardNumber.disabled = false;
            cardNumber.value = '';

            cardSVG1.innerHTML = ``
            cardSVG2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
</svg>`
            cardSVG3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
</svg>`

            cardSVG3.addEventListener('click', () => {

                console.log(cardNumber.value);
                cardNumber.disabled = true;
                cardSVG1.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_289)">
                                        <path
                                            d="M2.00009 9.23V10.75C2.00009 10.89 2.11009 11 2.25009 11H3.77009C3.83509 11 3.90009 10.975 3.94509 10.925L9.40509 5.47L7.53009 3.595L2.07509 9.05C2.02509 9.1 2.00009 9.16 2.00009 9.23ZM10.8551 4.02C11.0501 3.825 11.0501 3.51 10.8551 3.315L9.68509 2.145C9.49009 1.95 9.17509 1.95 8.98009 2.145L8.06509 3.06L9.94009 4.935L10.8551 4.02Z"
                                            fill="#2D3748" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_289">
                                            <rect width="12" height="12" fill="white"
                                                transform="translate(0.500092 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>`;
                cardSVG2.innerHTML = ``;
                cardSVG3.innerHTML = ``;

                                fetch(`${API_BASE_URL}/payment-methods/${payment - methods.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ number: cardNumber.value.trim() })
                })
                    .then((response) => {
                        if (!response.ok) {
                            errorBlock.textContent = 'Возникла ошибка при обновлении данных'
                        }
                    })
            })

            cardSVG2.addEventListener('click', () => {
                cardNumber.value = card.number;
                cardNumber.disabled = true;
                cardSVG1.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_289)">
                                        <path
                                            d="M2.00009 9.23V10.75C2.00009 10.89 2.11009 11 2.25009 11H3.77009C3.83509 11 3.90009 10.975 3.94509 10.925L9.40509 5.47L7.53009 3.595L2.07509 9.05C2.02509 9.1 2.00009 9.16 2.00009 9.23ZM10.8551 4.02C11.0501 3.825 11.0501 3.51 10.8551 3.315L9.68509 2.145C9.49009 1.95 9.17509 1.95 8.98009 2.145L8.06509 3.06L9.94009 4.935L10.8551 4.02Z"
                                            fill="#2D3748" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_289">
                                            <rect width="12" height="12" fill="white"
                                                transform="translate(0.500092 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>`;
                cardSVG2.innerHTML = ``;
                cardSVG3.innerHTML = ``;
            })
        })

        return input;

    })

    button.addEventListener('click', () => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('payment__form-container');

        const formSVG = document.createElement('div');

        const cardNumber = document.createElement('input');
        cardNumber.classList.add("payment__form")
        cardNumber.maxlength = "19";
        cardNumber.disabled = false;

        const cardSVG1 = document.createElement("button");

        const cardSVG2 = document.createElement("button");
        cardSVG2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
    </svg>`

        const cardSVG3 = document.createElement("button");
        cardSVG3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
    <linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
    </svg>`

        formContainer.append(formSVG, cardNumber, cardSVG1, cardSVG2, cardSVG3);
        input.append(formContainer);

        let newCard = {
            "id": '',
            "type": "",
            "number": cardNumber.value
        }

        fetch(`${API_BASE_URL}/payment-methods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCard)
        })
            .then((response) => {
                if (!response.ok) {
                    errorBlock.textContent = 'Возникла ошибка при получении данных'
                }
            })

        cardSVG3.addEventListener('click', () => {
            cardNumber.disabled = true;
            cardSVG1.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_0_289)">
                                            <path
                                                d="M2.00009 9.23V10.75C2.00009 10.89 2.11009 11 2.25009 11H3.77009C3.83509 11 3.90009 10.975 3.94509 10.925L9.40509 5.47L7.53009 3.595L2.07509 9.05C2.02509 9.1 2.00009 9.16 2.00009 9.23ZM10.8551 4.02C11.0501 3.825 11.0501 3.51 10.8551 3.315L9.68509 2.145C9.49009 1.95 9.17509 1.95 8.98009 2.145L8.06509 3.06L9.94009 4.935L10.8551 4.02Z"
                                                fill="#2D3748" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_289">
                                                <rect width="12" height="12" fill="white"
                                                    transform="translate(0.500092 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>`;
            cardSVG2.innerHTML = ``;
            cardSVG3.innerHTML = ``;
        })

        cardSVG2.addEventListener('click', () => {
            formContainer.remove();
        })
    })


    container.append(header, input);

}


