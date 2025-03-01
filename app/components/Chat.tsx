import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import Image from 'next/image';

const Chat = () => {
  const [submitType, setSubmitType] = useState<'question'|'practice'>("question");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your personal AI tutor. I can help explain concepts, answer questions, or create practice problems. What would you like to learn about today?"
      }
    ]
  });

  const getImageData = async () => {
    try {
      const response = await fetch('/api/dall-e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: `Create a clear educational illustration to help teach and explain: ${input}. Include relevant visual aids, diagrams, or examples that would help a student understand this concept. Make it suitable for an educational textbook.` 
        })
      });
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
      setError("");
    } catch (e) {
      setError(`An error occurred calling the API: ${e}`);
    }
    setLoading(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (submitType === 'question') {
      handleSubmit(event);
    } else {
      setLoading(true);
      setImageUrl("");
      getImageData().then();
    }
  };

  const userColors = {
    user: '#4CAF50',      // Student green
    assistant: '#2196F3', // Teacher blue
    function: '#fff',
    system: '#fff',
    tool: '#fff',
    data: '#fff'
  }

  const renderResponse = () => {
    if (submitType === 'question') {
      return (
        <div className="response education-theme">
          {messages.length > 0
          ? messages.map(m => (
              <div key={m.id} className="chat-line">
                <span style={{color: userColors[m.role]}}>
                  {m.role === 'user' ? '📚 Student: ' : '👩‍🏫 Teacher: '}
                </span>
                {m.content}
              </div>
            ))
          : error}
        </div>
      );
    } else {
      return (
        <div className="response">
          {loading && <div className="loading-spinner"></div>}
          {imageUrl && <Image src={imageUrl} className="image-box" alt="Generated image" width="400" height="400" />}
        </div>
      )
    }
  }

  return (
    <>
      {renderResponse()}
      <form onSubmit={onSubmit} className="mainForm">
        <input 
          name="input-field" 
          placeholder="Ask a question or request a practice problem..." 
          onChange={handleInputChange} 
          value={input} 
        />
        <button 
          type="submit" 
          className="mainButton" 
          disabled={loading} 
          onClick={() => setSubmitType('question')}
        >
          ASK QUESTION
        </button>
        <button 
          type="submit" 
          className="secondaryButton" 
          disabled={loading} 
          onClick={() => setSubmitType('practice')}
        >
          PRACTICE
        </button>
      </form>
    </>
  );
}

export default Chat;