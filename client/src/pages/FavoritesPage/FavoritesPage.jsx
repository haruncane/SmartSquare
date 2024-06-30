import React, { useContext, useEffect, useState } from 'react'
import './favoritesPage.css';
import Navbar from '../../components/Navbar/Navbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getChats, setFavorite } from '../../context/chatContext/apiCalls';
import { ChatContext } from './../../context/chatContext/ChatContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import { useSpeechSynthesis } from 'react-speech-kit';

const FavoritesPage = () => {
  const { user } = useContext(AuthContext);
  const { chats, dispatch } = useContext(ChatContext);
  const { speak, voices } = useSpeechSynthesis();
  const [category, setCategory] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const handleFavorite = async (_id) => {
    const isConfirmed = window.confirm("Are you sure you want to unfavorite this chat?");
    if (isConfirmed && _id) {
      await setFavorite(_id, dispatch);
      await getChats(user._id, dispatch);
    }
  };

  const handleSelection = (item) => {
    setSelectedChat([item][0]);
  };

  const handleExit = () => {
    setSelectedChat(null);
  };

  const handleSpeak = () => {
    if (selectedChat?.history) {
      const rawText = selectedChat.history.map(item => item.parts[0].text).join(' ');
      const speakText = rawText.replace(/\*/g, '');
      const voice = voices.find(voice => voice.name === "Google US English");
      speak({ text: speakText, voice: voice });
    }
  };

  useEffect(() => {
    if (user) {
      getChats(user._id, dispatch);
    }
    if (category === null || category === "null") {
      setFilteredFavorites(chats);
    } else {
      const filteredItems = chats.filter(item => item.category === category);
      setFilteredFavorites(filteredItems);
    }
  }, [user, dispatch, category]); 

  return (
    <div className='favoritesPage'>
        <Navbar setCategory={setCategory} />
        <div className="favorites-box">
          {
            selectedChat === null && <>
              {
                category === null && <>
                  {chats?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) =>  (
                    <div key={index} className="favorite-item">
                      <label onClick={() => handleSelection(item)} className='favorite-title'>{item.history[0].parts[0].text}</label>
                      {item.isFavorite ? 
                        (<FavoriteIcon onClick={() => handleFavorite(item._id)} className='favorite-icon' />) :
                        (<FavoriteBorderIcon onClick={() => handleFavorite(item._id)} className='favorite-icon' />)
                      }
                    </div>
                  ))}
                </>
              }
              {
                category !== null && <>
                  {filteredFavorites?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) =>  (
                    <div key={index} className="favorite-item">
                      <label onClick={() => handleSelection(item)} className='favorite-title'>{item.history[0].parts[0].text}</label>
                      {item.isFavorite ? 
                        (<FavoriteIcon onClick={() => handleFavorite(item._id)} className='favorite-icon' />) :
                        (<FavoriteBorderIcon onClick={() => handleFavorite(item._id)} className='favorite-icon' />)
                      }
                    </div>
                  ))}
                </>
              }
            </>
          }
          {
            selectedChat !== null && <>
              <div className='favorite-box-top'>
                <ArrowBackIcon onClick={handleExit} className='top-icon-left' />
                <VolumeUpIcon onClick={handleSpeak} className='top-icon-right' />
              </div>
              {
                selectedChat.history.map((item, index) => {
                  const isUserMsg = item.role === "user";
                  return (
                    <p 
                      key={index} 
                      spellCheck="false" 
                      className={`chat-item ${isUserMsg ? "user-msg" : "model-msg"}`}
                    >
                      {item.parts[0].text} 
                    </p>
                  )
                })
              }
            </>
          }
        </div>
    </div>
  )
}

export default FavoritesPage;