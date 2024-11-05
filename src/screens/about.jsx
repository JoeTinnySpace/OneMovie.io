import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  const [feedback, setFeedback] = useState('');

  // Function to send a message via Telegram bot
  const telegramBotSendText = async (botMessage, chatId) => {
    const botToken = '5270448407:AAHMOoN5BJ1Q5yPjZUaQ0I46qeaQCNJ-zQ8';
    const sendTextUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=Markdown&text=${encodeURIComponent(botMessage)}`;

    try {
      const response = await fetch(sendTextUrl);
      const data = await response.json();

      if (response.ok) {
        console.log('Message sent successfully:', data);
        toast.success('Feedback sent successfully!'); // Show success toast
      } else {
        console.error('Error sending message:', data);
        toast.error('Error sending feedback. Please try again.'); // Show error toast
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error. Please check your connection.'); // Show network error toast
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const chatId = '519768158'; // Replace with the chat ID you want to send to
    if ( feedback.length > 0 ){
      telegramBotSendText(feedback, chatId); // Send the feedback as a message
    }else{
      toast.info('Enter valid feedback.')
    }
    setFeedback(''); // Clear the feedback input after submission
  };

  return (
    <div className='dark'>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">OneMovieDiscover</h1>

          {/* Developer Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Developer Talks</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We aim to provide a seamless experience for movie enthusiasts to discover and manage their favorite films.
              <br />
              The data is stored on your web browser cache and it never leaves your device.
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
            </ol>
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
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default About;


// import React, { useState } from 'react';

// const About = () => {
//   // State to hold the feedback message
//   const [feedback, setFeedback] = useState('');

//   // Function to send a message via Telegram bot
//   const telegramBotSendText = async (botMessage, chatId) => {
//     const botToken = '5270448407:AAHMOoN5BJ1Q5yPjZUaQ0I46qeaQCNJ-zQ8';
//     const sendTextUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=Markdown&text=${encodeURIComponent(botMessage)}`;

//     // https://api.telegram.org/bot5270448407:AAHMOoN5BJ1Q5yPjZUaQ0I46qeaQCNJ-zQ8/sendMessage?chat_id=
//     try {
//       const response = await fetch(sendTextUrl);
//       const data = await response.json();

//       if (response.ok) {
//         console.log('Message sent successfully:', data);
//       } else {
//         console.error('Error sending message:', data);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };

//   // Handler for form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     const chatId = '519768158'; // Replace with the chat ID you want to send to
//     telegramBotSendText(feedback, chatId); // Send the feedback as a message
//     setFeedback(''); // Clear the feedback input after submission
//   };

//   return (
//     <div className='dark'>
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">OneMovie.io</h1>

//           {/* Developer Details */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Developer Talks</h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               We aim to provide a seamless experience for movie enthusiasts to discover and manage their favorite films.
//               <br />
//               The data is stored on your web browser cache and it never leaves your device.
//             </p>
//           </section>

//           {/* Technology Stack */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Technology Stack</h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-2">
//               The app is built using:
//             </p>
//             <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
//               <li>React.js for the frontend</li>
//               <li>Tailwind CSS for styling</li>
//               <li>Font Awesome for icons</li>
//               <li>TMDB API for movie data</li>
//             </ul>
//           </section>

//           {/* How to Use the App */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">How to Use the App</h2>
//             <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300">
//               <li>Navigate to the home page to explore movie recommendations.</li>
//               <li>Use the filters to refine your search based on genres, ratings, and release years.</li>
//               <li>Click on a movie title to view its details, including the overview, rating, and trailers.</li>
//               <li>Add movies to your watchlist or skip them based on your preferences.</li>
//             </ol>
//           </section>

//           {/* Feedback Section */}
//           <section>
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Feedback</h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//               We value your feedback! Please let us know your thoughts and suggestions to help us improve the app.
//             </p>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <textarea
//                 rows="4"
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)} // Update feedback state
//                 className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
//                 placeholder="Your feedback..."
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Submit Feedback
//               </button>
//             </form>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
