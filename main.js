import { GoogleGenerativeAI } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from './gemini-api-banner';
import './style.css';

let API_KEY = 'AIzaSyBqxiXnncNi5Yduk4__GE4GKVpADT5D7f0';

let chatHistory = [];

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function updateChatWindow() {
  chatWindow.innerHTML = '';
  chatHistory.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.className = message.sender === 'Me' ? 'user-message' : 'ai-message';
    messageElement.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
    chatWindow.appendChild(messageElement);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  chatHistory.push({ sender: 'Me', text: userMessage });
  updateChatWindow();

  userInput.value = '';

  const aiResponse = await fetchAIResponse(userMessage);
  chatHistory.push({ sender: 'MINNRN AI', text: aiResponse });
  updateChatWindow();
});

async function fetchAIResponse(userMessage) {
  // Placeholder function for actual API call to Gemini AI
  // Here you would integrate the call to the AI with the user's message
  return "This is a simulated AI response.";
}

// Handle image upload
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    chatHistory.push({ sender: 'Me', text: `Uploaded image: ${file.name}` });
    updateChatWindow();
    // You can also handle image preview or processing here
  }
});

maybeShowApiKeyBanner(API_KEY);