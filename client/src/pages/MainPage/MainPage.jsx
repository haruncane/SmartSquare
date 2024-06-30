import React, { useContext, useEffect, useRef, useState } from 'react';
import "./mainPage.css";
import Navbar from '../../components/Navbar/Navbar';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createChat, getLastCreatedChat, setFavorite, updateChat } from '../../context/chatContext/apiCalls';
import { ChatContext } from './../../context/chatContext/ChatContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import { PropagateLoader } from 'react-spinners';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

const MainPage = () => {
  const { user } = useContext(AuthContext);
  const { chat, dispatch } = useContext(ChatContext);
  const { speak, voices } = useSpeechSynthesis();
  const chatEndRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isChatCome, setIsChatCome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState([]);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleFavorite = async (_id) => {
    if (_id) {
      await setFavorite(_id, dispatch);
      await getLastCreatedChat(user._id, dispatch);
    }
  };

  const handleSubmit = async () => {
    const micInput = transcript.toString();
    if (!prompt && !micInput) {
      alert("Please Ask A Question!");
      return;
    } 
    const userInput = prompt || micInput;
    setIsSubmitted(true);
    setIsLoading(true);
    if (user) {
      const userMessage = { role: "user", text: userInput };
      setCurrentChat([...currentChat, userMessage]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (chat) {
        await updateChat(userInput, chat, dispatch);
      } else {
        await createChat(user._id, userInput, category, dispatch);    
      }
    }
    setPrompt("");
    resetTranscript();
    setIsChatCome(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const handleSpeak = () => {
    if (chat?.history) {
      const rawText = chat.history.map(item => item.parts[0].text).join(' ');
      const speakText = rawText.replace(/\*/g, '');
      const voice = voices.find(voice => voice.name === "Google US English");
      speak({ text: speakText, voice: voice });
    }
  };

  useEffect(() => {/*
    if (isChatCome) {
      getLastCreatedChat(user._id, dispatch);
      setIsChatCome(false);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (chat) {
      const lastResponse = chat.history[chat.history.length - 1];
      if (lastResponse.role === "model") {
        if (currentChat.text?.includes(lastResponse)) {
          return
        }
        currentChat.push({ role: "model", text: lastResponse.parts[0].text });
        setIsLoading(false);
      }
    }*/
    if (isChatCome) {
      const fetchLatestChat = async () => {
        await getLastCreatedChat(user._id, dispatch);
        if (chat) {
          const lastResponse = chat.history[chat.history.length - 1];
          if (lastResponse.role === "model") {
            const modelMessage = { role: "model", text: lastResponse.parts[0].text };
            if (!currentChat.includes(modelMessage)) {
              setCurrentChat([...currentChat, modelMessage]);
            }
          }
        }
        setIsChatCome(false);
        setIsLoading(false);
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      fetchLatestChat();
    }
  }, [dispatch, user._id, isChatCome, chat, currentChat]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='mainPage'>
      <Navbar setCategory={setCategory} />
      <div className="chat-box">
        <div className="output-box">
          {isSubmitted &&
            currentChat?.map((item, index) => {
              const isUserMsg = item.role === "user";
              return (
                <p
                  key={index}
                  spellCheck="false"
                  className={`output-text ${isUserMsg ? "user-msg" : "model-msg"}`}
                >
                  {item.text}
                </p>
              )
            })
          }
          <div ref={chatEndRef} />
        </div>
        <div className="input-box">
          <div className="input-box-left">
            <VolumeUpIcon onClick={handleSpeak} className='chat-icons' />
            <hr className='btn-line'/>
            {listening ? <MicIcon color='success' /> : <MicIcon onClick={SpeechRecognition.startListening} className='chat-icons' />}
          </div>
          { 
            (isLoading) ? (<PropagateLoader className='spinner-loader' color="#3A5A40" size={15} />) : (
              <textarea 
                onChange={handleChange} 
                className='input-box-mid' 
                cols="30" 
                rows="3"
                placeholder={`Ask Something${category && category !== "null" ? ` About ${category}` : ""}`}
                value={prompt || transcript}
              >
              </textarea>  
            )
          }
          <div className="input-box-right">
            <PlayArrowIcon onClick={handleSubmit} className='chat-icons' />
            <hr className='btn-line'/>
            {(chat && chat.isFavorite) ? 
              (<FavoriteIcon onClick={() => handleFavorite(chat?._id)} className='chat-icons' />) :
              (<FavoriteBorderIcon onClick={() => handleFavorite(chat?._id)} className='chat-icons' />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage;