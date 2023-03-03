const timerButton = document.querySelectorAll('.timer__button');  
const displayTimeLeft = document.querySelector('.display__time-left');  
const displayEndTime = document.querySelector('.display__end-time'); 
const enterTime = document.querySelector('#custom');



let countdown;  

 function timer(seconds) {  
   // clear any existing timers  
   clearInterval(countdown);

   const now = Date.now();  
   const then = now + seconds * 1000;  

    // minutes and seconds left for the timer to run   
    let minutesLeft = Math.floor((then - Date.now()) / 1000 / 60);    
    let secondsLeft = Math.floor((then - Date.now()) / 1000 % 60);    

    // displays time left    
    displayTimeLeft.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;    

    countdown = setInterval(() => {    

      // the minutes and seconds left for the timer to run     
      minutesLeft = Math.floor((then - Date.now()) / 1000 / 60);      
      secondsLeft = Math.floor((then - Date.now()) / 1000 % 60);      

      // check if you should stop it!      
      if (minutesLeft < 0 || secondsLeft < 0) {        
        clearInterval(countdown);        
        return;
 }

    // displaying it
    displayTimeLeft.textContent = `${minutesLeft}:${secondsLeft<10 ?'0'+secondsLeft : secondsLeft}`;

  }, 1000);

  // show end time in the form of hh:mm:ss format (24 hour clock)  
  const endTimeFormatted = new Date(then).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });  
  displayEndTime.textContent = `Be Back At ${endTimeFormatted}`;  
}

//  adding event listeners to the buttons and the form input 
 timerButton.forEach(button => button.addEventListener('click', startTimer));  

 function startTimer() {  
   const seconds = parseInt(this.dataset.time);  
   timer(seconds);  
 }


 // Event Listener to the form
document.getElementById('custom').addEventListener('submit', startCountdown);

// Countdown Function for the form
function startCountdown(e) {
  e.preventDefault();

  // Get minutes from form
  const minutes = document.forms['customForm']['minutes'].value;

  // Validate minutes
  if (minutes === '' || minutes < 0 || isNaN(minutes)) {
    alert('Please enter a valid number of minutes');
    return; // Stop function if validation fails
  }

  // Calculating seconds from minutes entered in form
  const seconds = minutes * 60 ;

    timer(seconds);

  
  };