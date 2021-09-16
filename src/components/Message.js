import React, { useState } from 'react'
import { formatRelative } from 'date-fns'
import styled from 'styled-components'

const MessageBox = styled.div `
    flex-direction: ${props => props.isMyMessage ? "row-reverse" : "row"};
    display: flex;
    align-items: center;
    margin-top: 2rem;

    @media screen and (max-width: 768px) {
        justify-content: center;
    } 

    img {
        border-radius: 50%;
        height: 50px;
    }

    p {
        margin: 0 0 5px 0;
        word-break: break-all;
    }


    div {
        position: relative;
        background-color: white;
        border-radius: 8px;
        width: 315px;
        ${props => props.isMyMessage ? "margin-right: 15px;" : "margin-left: 15px;"};
        padding: 7px 8px;
        max-width: 70vw;

        
    &:first-child {
        background-color: initial;
        position: absolute;
        ${props => props.isMyMessage ? "right: -10px;" : "left: -10px;"}
        
        top: calc(50% - 12px);
        width: 0; 
        height: 0; 
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        ${props => props.isMyMessage ? "border-left:15px solid white;" : "border-right:15px solid white;"};
         
    }

        div {
            display: flex;
            justify-content: space-between;
            margin: 0;
            padding: 0;

            p {
                font-weight: bold;
            }

            span {
                text-align: end;
                font-style: italic;
                font-size: small;
            }

        }
    }
`

const Message = ({ message, user }) => {

    // if (message.displayName === user.displayName) {

    // }


    return (
    <MessageBox isMyMessage={message.displayName === user.displayName}>
      {message?.photoURL ? (
        <img
          src={message?.photoURL}
          alt="Foto de perfil"
        />
        ) : null}
 
      <div>
        <div></div>   
        <div>
          {message?.displayName ? (
            <p>{message?.displayName}</p>
          ) : null}
          {message?.createdAt?.seconds ? (
            <span>
              {formatRelative(new Date(message?.createdAt.seconds * 1000), new Date())}
            </span>
          ) : null}
        </div>
        <p>{message?.text}</p>
      </div>
    </MessageBox>
  );
}

export default Message;