import React from 'react'
import styled from 'styled-components'
import imgHexagon from '../../images/hexagon.svg'
import { theme } from '../theme'
import { Fade } from 'react-reveal'

const StyledRules = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  counter-reset: listCounter;

  li {
    position: relative;
    counter-increment: listCounter;
    padding-left: 60px;
    margin: 0;

    &::before {
      content: '#' counter(listCounter);
      position: absolute;
      left: 0;
      color: ${theme.global.colors.brand};
      font-weight: bold;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -60px;
      width: 25px;
      height: 27px;
      mask-image: url(${imgHexagon});
      background-repeat: no-repeat;
      background-color: #999999;
    }

    + li {
      margin-top: 100px;
    }
  }
`

const RulesOfCodingEarth = () => (
  <StyledRules>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        we neither care about your gender, your skin tone, your religious views,
        the language your mother taught you nor your heritage or favorite
        science fiction series, we only care about you as a developer.
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        no marketing, no recruiting, only tech and if possible: <b>code</b>{' '}
        (lets consider yaml valid, and of course you may announce that your
        company is hiring)
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        don't bash one technology in favor of another without giving a concrete
        reason (Ruby is sh*t, Rust is much better, you know the game)
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        one demo gets you rid of 10 slides so don't be shy and type live, we're
        all developers so we'll only laugh at obvious typos
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        as soon as 1 person is around who doesn't understand the local language
        we <b>switch to English</b> (exceptions must be announced and if she
        doesn't understand English as well we ran out of options).
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>food is not always free, but maybe you get a t-shirt</li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        everyone can become a developer. everyone can become a better developer.
        being a bad developer doesn't make you a bad person. there are no bad
        developers
      </li>
    </Fade>
    <Fade top ssrFadeout distance="20px" duration={500}>
      <li>
        <strong>you do talk about coding earth</strong>
      </li>
    </Fade>
  </StyledRules>
)

export default RulesOfCodingEarth
