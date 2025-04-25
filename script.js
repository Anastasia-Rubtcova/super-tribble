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

fetch(`${API_BASE_URL}/accounts`)
    .then(response => response.json())
    .then((data) => {
       document.getElementById("salary").textContent = data[0].balance;
       document.getElementById("frilance").textContent = data[1].balance;
    })

