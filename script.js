let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let selectedVoice = null;

// API keys
const weatherAPIKey = "352d152023fcffa8eb03fbbf4e6353c0";
const dadJokesAPIKey = "e3AvpXW7b9Im54z3NDSD3Q==hMlX7UkhwAgSmXcx";
const newsAPIKey = "beac3784a3ca4f2db8fdece5a66c3176";

// Task, Notes, and Notifications Management
let tasks = [];
let notes = [];
let notifications = [];

// Function to speak text
function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "hi-GB";

    // Set the selected voice if available
    if (selectedVoice) {
        textSpeak.voice = selectedVoice;
    }
    window.speechSynthesis.speak(textSpeak);
}

// Function to wish user based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Start speech recognition on button click
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

// Function to handle commands from voice input
async function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    // Greetings
    if (message.includes("hello") || message.includes("hey") || message.includes("hi") || message.includes("greetings") || message.includes("howdy")) {
        speak("Hello Sir..... what can I help you with?");
    } 
    

    // Personal introduction
    else if (message.includes("tell me about yourself") || message.includes("hu are you") || message.includes("introduce yourself")) {
        speak("I am elina......... a virtual assistant, created by Hemanta.");
    } 

    // Open websites
    else if (message.includes("open youtube") || message.includes("go to youtube") || message.includes("youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } 
    else if (message.includes("open google") || message.includes("go to google") || message.includes("google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } 
    else if (message.includes("open facebook") || message.includes("go to facebook") || message.includes("facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } 
    else if (message.includes("open instagram") || message.includes("go to instagram") || message.includes("instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } 
    else if (message.includes("open calculator") || message.includes("launch calculator") || message.includes("calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } 
    else if (message.includes("open whatsapp") || message.includes("launch whatsapp") || message.includes("whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } 

    // Time and Date
    else if (message.includes("time") || message.includes("current time") || message.includes("what time is it")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } 
    else if (message.includes("date") || message.includes("current date") || message.includes("what's the date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } 

    // Weather
    else if (message.includes("weather") || message.includes("what's the weather") || message.includes("tell me the weather")) {
        const city = message.split("in ")[1] || "your location";
        await getWeather(city);
    } 

    // Dad Jokes
    else if (message.includes("dad joke") || message.includes("tell me a joke") || message.includes("joke")) {
        await getDadJoke();
    } 

    // News
    else if (message.includes("news") || message.includes("what's the news") || message.includes("give me the news")) {
        await getNews();
    } 

    // Task Management
    else if (message.includes("add task") || message.includes("create task") || message.includes("new task")) {
        let task = message.split(/add task |create task |new task /)[1];
        addTask(task);
    } 
    else if (message.includes("view tasks") || message.includes("list tasks") || message.includes("show tasks")) {
        viewTasks();
    } 
    else if (message.includes("remove task") || message.includes("delete task") || message.includes("task remove")) {
        let taskToRemove = message.split(/remove task |delete task |task remove /)[1];
        removeTask(taskToRemove);
    } 

    // Note Management
    else if (message.includes("add note") || message.includes("create note") || message.includes("new note")) {
        let note = message.split(/add note |create note |new note /)[1];
        addNote(note);
    } 
    else if (message.includes("view notes") || message.includes("list notes") || message.includes("show notes")) {
        viewNotes();
    } 
    else if (message.includes("remove note") || message.includes("delete note") || message.includes("note remove")) {
        let noteToRemove = message.split(/remove note |delete note |note remove /)[1];
        removeNote(noteToRemove);
    } 

    // Notification Management
    else if (message.includes("add notification") || message.includes("create notification") || message.includes("new notification")) {
        let notification = message.split(/add notification |create notification |new notification /)[1];
        addNotification(notification);
    } 
    else if (message.includes("view notifications") || message.includes("list notifications") || message.includes("show notifications")) {
        viewNotifications();
    } 
    else if (message.includes("remove notification") || message.includes("delete notification") || message.includes("notification remove")) {
        let notificationToRemove = message.split(/remove notification |delete notification |notification remove /)[1];
        removeNotification(notificationToRemove);
    } 

    // Calculate Expressions
    else if (message.includes("calculate") || message.includes("do a calculation") || message.includes("calculate this")) {
        let expression = message.split("calculate ")[1] || message.split(/do a calculation |calculate this /)[1];
        calculate(expression);
    } 

    // Set Reminder
    else if (message.includes("set reminder") || message.includes("create reminder") || message.includes("new reminder")) {
        let reminder = message.split(/set reminder for |create reminder |new reminder /)[1];
        setReminder(reminder);
    } 

    // Default response
    else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
            const weatherInfo = `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp} degrees Celsius.`;
            speak(weatherInfo);
        } else {
            speak("I couldn't find the weather information for that location.");
        }
    } catch (error) {
        speak("Sorry, there was an error fetching the weather data.");
    }
}

// Function to fetch a dad joke
async function getDadJoke() {
    try {
        const response = await fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                Accept: "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });
        const data = await response.json();
        speak(data.joke);
    } catch (error) {
        speak("Sorry, I couldn't fetch a dad joke at the moment.");
    }
}

// Function to fetch news headlines
async function getNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`);
        const data = await response.json();
        const articles = data.articles.slice(0, 5); // Get the first 5 articles
        if (articles.length > 0) {
            articles.forEach((article) => {
                speak(`Title: ${article.title}. Description: ${article.description}`);
            });
        } else {
            speak("No news articles found.");
        }
    } catch (error) {
        speak("Sorry, I couldn't fetch the news at the moment.");
    }
}

// Task management functions
function addTask(task) {
    tasks.push(task);
    speak(`Task added: ${task}`);
}

function viewTasks() {
    if (tasks.length === 0) {
        speak("You have no tasks.");
    } else {
        let taskList = tasks.join(", ");
        speak("Your tasks are: " + taskList);
    }
}

function removeTask(task) {
    tasks = tasks.filter(t => t.toLowerCase() !== task.toLowerCase());
    speak(`Task removed: ${task}`);
}

// Note management functions
function addNote(note) {
    notes.push(note);
    speak(`Note added: ${note}`);
}

function viewNotes() {
    if (notes.length === 0) {
        speak("You have no notes.");
    } else {
        let noteList = notes.join(", ");
        speak("Your notes are: " + noteList);
    }
}

function removeNote(note) {
    notes = notes.filter(n => n.toLowerCase() !== note.toLowerCase());
    speak(`Note removed: ${note}`);
}

// Notification management functions
function addNotification(notification) {
    notifications.push(notification);
    speak(`Notification added: ${notification}`);
}

function viewNotifications() {
    if (notifications.length === 0) {
        speak("You have no notifications.");
    } else {
        let notificationList = notifications.join(", ");
        speak("Your notifications are: " + notificationList);
    }
}

function removeNotification(notification) {
    notifications = notifications.filter(n => n.toLowerCase() !== notification.toLowerCase());
    speak(`Notification removed: ${notification}`);
}

// Function to perform calculations
function calculate(expression) {
    try {
        let result = eval(expression);
        speak(`The result of ${expression} is ${result}`);
    } catch (error) {
        speak("Sorry, I couldn't perform that calculation.");
    }
}

// Function to set a reminder (basic implementation)
function setReminder(reminder) {
    speak(`Reminder set for: ${reminder}`);
    // Additional functionality to handle reminders can be implemented here
}

// Initial greeting
wishMe();
