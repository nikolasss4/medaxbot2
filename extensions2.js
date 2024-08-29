export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')
    // Get current date and time
    let currentDate = new Date()
    let minDate = new Date()
    minDate.setMonth(currentDate.getMonth() - 1)
    let maxDate = new Date()
    maxDate.setMonth(currentDate.getMonth() + 2)
    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16)
    let maxDateString = maxDate.toISOString().slice(0, 16)
    formContainer.innerHTML = `
      <style>
        .date-form {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 300px;
          margin: 0 auto;
        }
        label {
          display: block;
          font-size: 16px;
          color: #333;
          margin-bottom: 8px;
        }
        .meeting input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .submit {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          color: white;
          background: linear-gradient(to right, #2e6ee1, #2e7ff1);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .submit:enabled {
          opacity: 1;
        }
      </style>
      <div class="date-form">
        <label for="meeting">Виберіть дату і час</label>
        <div class="meeting">
          <input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" />
        </div>
        <input type="submit" id="submit" class="submit" value="підтвердити" disabled="disabled">
      </div>
    `
    const submitButton = formContainer.querySelector('#submit')
    const datetimeInput = formContainer.querySelector('#meeting')
    datetimeInput.addEventListener('input', function () {
      submitButton.disabled = !this.value
    })
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()
      const datetime = datetimeInput.value
      console.log(datetime)
      let [date, time] = datetime.split('T')
      submitButton.remove()
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date, time: time },
      })
    })
    element.appendChild(formContainer)
  },
}

