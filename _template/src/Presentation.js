import React from "react";

/* eslint-disable jsx-a11y/iframe-has-title, jsx-a11y/alt-text,  */
/* eslint-disable no-unused-vars */

import { useState } from "react";

import {
  AnimateSVG,
  Morph,
  m,
  M,
  Show,
  Notes,
  Portal,
  timeline,
  range,
  themes,
} from "immersion-presentation";

import "immersion-presentation/dist/index.css";
import step from "immersion-presentation/dist/step.macro.js";

const {
  Presentation,
  Slide,
  BibliographySlide,
  TitleSlide,
  TableOfContentsSlide,
  SectionSlide,
  QuestionSlide,
  ConclusionSlide,
  Figure,
  List,
  Item,
  Cite,
  Box,
  Qed,
} = themes.modern;

function App() {
  return (
    <Presentation>
      <Slide steps={[1, 2, 3]}>The step is {step}!</Slide>
    </Presentation>
  );
}

export default App;
