# English Vocabulary Learning App

A simple and interactive web application for learning English vocabulary with Chinese translations.

## Features

- **Vocabulary List View**
  - Display English words with their Chinese translations
  - Clean and modern card-based layout
  - Hover effects for better interaction

- **Interactive Quiz Mode**
  - Random vocabulary testing
  - 15-second time limit per question
  - Multiple choice format
  - Immediate visual feedback (green for correct, red for incorrect)
  - Real-time score tracking

## Project Structure

```
english-vocab-app/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## How to Use

1. Open `index.html` in a web browser
2. Browse the vocabulary list to study the words
3. Click "Start Test" to begin the quiz
4. Select the correct English word for each Chinese translation
5. Complete the quiz to see your final score

## Technical Details

- Pure HTML/CSS/JavaScript implementation
- No external dependencies required
- Responsive design that works on both desktop and mobile devices
- Randomized question generation for varied practice

## Development

To modify the vocabulary list, edit the `vocabulary` array in `script.js`. Each vocabulary item should follow this format:

```javascript
{
    english: 'word',
    translation: '翻譯'
}
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available for educational purposes.
