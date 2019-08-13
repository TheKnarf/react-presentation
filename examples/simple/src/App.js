import React from 'react';
import { Presentation, Slideset, Slide } from 'react-presentation';
import '../node_modules/react-presentation/lib/index.css';
import Highlight from 'react-highlight';

export default () =>
	<Presentation>
		<Slideset i={0}>
			<Slide>
				<h1>Example presentation</h1>
				<h2>
					<span role="img" aria-label="lightning">⚡</span>-talk by Frank Lyder Bredland
				</h2>
			</Slide>
			<Slide>
				<h1> Slide 2 </h1>
			</Slide>
		</Slideset>
		<Slideset i={1}>
			<Slide>
				<h1> Code Sample </h1>
				<Highlight className='JavaScript'>
				{
					"import React, { useState } from 'react'\n" +
					"import * as THREE from 'three/src/Three'\n" +
					"import { Canvas } from 'react-three-fiber'"
				}
				</Highlight>
			</Slide>
		</Slideset>
		<Slideset i={2}>
			<Slide>
				<h1> Use cases </h1>
				<ul>
					<li> Portifolio pages </li>
					<li> Data visualization </li>
					<li> Landingpages </li>
					<li> Fancy presentations </li>
				</ul>
			</Slide>
		</Slideset>
	</Presentation>;
