import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentDelay = Number(delayInput.value);
    if (currentDelay < 0 || !currentDelay) {
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

    const selectedState = form.querySelector('input[name="state"]:checked');
    if (!selectedState) {
        iziToast.error({
            title: 'Error',
            message: 'Choose a state.',
            position: 'topRight',
            close: false,
            progressBar: false,
            icon: ""
        });
        return;
    }

    const stateValue = selectedState.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue === "fulfilled") {
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
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                close: false,
                progressBar: false,
                icon: ""
            });
        });
});