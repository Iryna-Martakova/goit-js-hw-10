import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const fulfilledCheck = form.querySelector('input[name="state"][value="fulfilled"]');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentDelay = Number(delayInput.value);

    if (currentDelay < 0) {
        iziToast.error({
            title: 'Error',
            message: 'Type positive number',
            position: 'topRight',
            close: false,
            progressBar: false,
            icon: ""
        });
        return;
    }

    const selectedState = document.querySelector('input[name="state"]:checked');

    if (!selectedState) {
        iziToast.error({
            title: 'Error',
            message: 'Choose a state".',
            position: 'topRight',
            close: false,
            progressBar: false,
            icon: ""
        });
        return;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilledCheck.checked) {
                resolve(currentDelay);
            } else {
                reject(currentDelay);
            }
        }, currentDelay);
    });

    promise
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                close: false,
                progressBar: false,
                icon: ""
            });
            console.log(`✅ Fulfilled promise in ${delay}ms`);
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                close: false,
                progressBar: false,
                icon: ""
            });
            console.log(`❌ Rejected promise in ${delay}ms`);
        });
});