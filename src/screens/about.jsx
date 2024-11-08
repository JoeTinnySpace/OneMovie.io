import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ArrowKeys  from '../components/keys_demo/ArrowKeys'

const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

const About = () => {
  const [feedback, setFeedback] = useState('');

  // Function to send a message via Telegram bot 
  const telegramBotSendText = async (botMessage) => {
    const sendTextUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=Markdown&text=${encodeURIComponent(botMessage)}`;

    try {
      const response = await fetch(sendTextUrl);

      if (response.ok) {
        toast.success('Feedback Recieved, Thank You !'); //  success toast
      } else {
        toast.error('Error sending feedback. Please try again.'); //  error toast
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.'); //  network error toast
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.length > 0) {
      telegramBotSendText(feedback); // Send the feedback as a message
    } else {
      toast.info('Enter valid feedback.')
    }
    setFeedback(''); // Clear feedback input 
  };

  const resetAppData = () => {
    localStorage.clear();
    toast.info('App data reset successfully.');
  };

  const resetFilters = () => {
    localStorage.removeItem('explore_filters'); 
    toast.info('Filters reset successfully.');
  };

  return (
    <div className='dark'>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 mb-20 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">OneMovieDiscover</h1>

          {/* Developer Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Developer Talks</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We aim to provide a seamless experience for movie enthusiasts to discover and manage their favorite films.
              <br />
              The data is stored on your web browser cache and never leaves your device (Except the feedback).
            </p>
          </section>

          {/* Technology Stack */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Technology Stack</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              The app is built using:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>React.js for the frontend</li>
              <li>Tailwind CSS for styling</li>
              <li>Font Awesome for icons</li>
              <li>TMDB API for movie data</li>
            </ul>
          </section>

          {/* How to Use the App */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">How to Use the App</h2>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300">
              <li>Navigate to the home page to explore movie recommendations.</li>
              <li>Use the filters to refine your search based on genres, ratings, and release years.</li>
              <li>Click on a movie title to view its details, including the overview, rating, and trailers.</li>
              <li>Add movies to your watchlist or skip them based on your preferences.</li>
              <li>Use the below keyboard shortcuts to navigate the slider.</li>
            </ol>
          <ArrowKeys/>
          
          </section>

          {/* Feedback Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Feedback</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We value your feedback! Please let us know your thoughts and suggestions to help us improve the app.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <textarea
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)} // Update feedback state
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                placeholder="Your feedback..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit Feedback
              </button>
            </form>
          </section>

           {/* Reset Buttons Section */}
           <section className="mt-8 border-y-[1px] p-4 border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">App Settings</h2>
            <p className='text-red-600'>Warning! This will delete the OneMovieDiscover app data</p>
            <br />
            <div className="flex space-x-4">
              <button
                onClick={resetAppData}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reset App Data
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Reset Filters
              </button>
            </div>
          </section>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default About;