class Countdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style> @import "./src/countdown/style.css"; </style>
            <div class="main">
            <section class="countdown-container">
            <div class="days-container">
                <div class="days"></div>
                <div class="days-label">days</div>
            </div>
            <div class="hours-container">
                <div class="hours"></div>
                <div class="hours-label">hours</div>
            </div>
            <div class="minutes-container">
                <div class="minutes"></div>
                <div class="minutes-label">minutes</div>
            </div>
            <div class="seconds-container">
                <div class="seconds"></div>
                <div class="seconds-label">seconds</div>
            </div>
            </section>
            </div>
        `;
    }

    _convertFormat(number, format) {
        switch (format) {
            case "seconds":
                return this._timer(number);
            case "minutes":
                return this._timer(number * 60);
            case "hours":
                return this._timer(number * 60 * 60);
            case "days":
                return this._timer(number * 60 * 60 * 24);
        }
    }

    _timer(seconds) {
        let countdown;
        const now = Date.now();
        const then = now + seconds * 1000;

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                return;
            }

            this._displayTimeLeft(secondsLeft);
        }, 1000);
    }

    _displayTimeLeft(seconds) {
        const d = this.shadowRoot;
        const daysElement = d.querySelector(".days");
        const hoursElement = d.querySelector(".hours");
        const minutesElement = d.querySelector(".minutes");
        const secondsElement = d.querySelector(".seconds");

        daysElement.textContent = Math.floor(seconds / 86400);
        hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
        minutesElement.textContent = Math.floor(
            ((seconds % 86400) % 3600) / 60
        );
        secondsElement.textContent =
            seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    }

    set setStartCountdown(days) {
        const countDownClock = (number = 100, format = "seconds") => {
            this._convertFormat(number, format);
        };

        /*
            start countdown
            enter number and format
            days, hours, minutes or seconds
          */
        countDownClock(days, "days");
    }
}
customElements.define("wc-countdown", Countdown);
