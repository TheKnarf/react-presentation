import React, { useState } from 'react'
import * as THREE from 'three/src/Three'
import { Canvas } from 'react-three-fiber'
import Presentation from './components/presentation';
import { Slideset, Slide } from './components/slide';
import SlideInfo from './components/slide_info';
import Stamp from './components/2s_stamp';
import Location from './components/location';
import Highlight from 'react-highlight'
import '../node_modules/highlight.js/styles/a11y-dark.css';
import threejspng from './threejs.png';

import img1 from './img/LDddjjC.gif';
import img2 from './img/zrhe5Jc.gif';
import img3 from './img/jemlXzE.gif';
import img4 from './img/vjmDwpS.gif';
import img5 from './img/tQi753C.gif';
import img6 from './img/iFtjKHM.gif';

const Thing = ({ vertices, color }) => {
	const [ materialColor, setMaterialColor ] = useState('peachpuff');

	return <group>
		<line>
			<geometry
				attach="geometry"
				vertices={vertices.map(v => new THREE.Vector3(...v))}
				onUpdate={self => (self.verticesNeedUpdate = true)}
				/>
			<lineBasicMaterial attach="material" color="black" />
		</line>
		<mesh
			onClick={() => setMaterialColor('peachpuff')}
			onPointerOver={() => setMaterialColor('grey')}
			onPointerOut={() => setMaterialColor('peachpuff')}>
			<octahedronGeometry attach="geometry" />
			<meshBasicMaterial attach="material" color={materialColor} opacity={0.5} transparent />
		</mesh>
	</group>;
};

const Link = ({ href }) =>
	<a href={href}>{ href }</a>;

const App = () =>
	<Presentation>
		<Stamp />
		<Canvas>
			<Thing vertices={[[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]]} />
		</Canvas>
		<Slideset i={0}>
			<Slide>
				<h1> React Three Fiber </h1>
				<h2>
					<span role="img" aria-label="lightning">⚡</span>-talk by Frank Lyder Bredland
				</h2>
			</Slide>
			<Slide>
				<h1> Links </h1>
				<p> This talk: <Location asLink={true} withPathname={true} /> </p>
				<p> GitHub: <Link href="https://github.com/theknarf-talks/react-three-fiber" /> </p>
			</Slide>
			<Slide>
				<h1> React.js </h1>
				<p>"A JavaScript library for building user interfaces"</p>
			</Slide>
			<Slide>
				<h1> Three.js </h1>
				<p> <Link href="https://threejs.org/" /> </p>
				<img alt="three.js" src={threejspng} height="400px" style={{ 'margin-left': '30vw' }}/>
			</Slide>
			<Slide>
				<h1> React-three-fiber </h1>
				<p> React-three-fiber: <Link href="https://github.com/drcmda/react-three-fiber" /> </p>
			</Slide>
			<Slide>
				<h1> Example 1 </h1>
				<a href="https://codesandbox.io/embed/m7q0r29nn9"><img alt="img1" src={img1} style={{ 'margin-left': '30vw' }}/></a>
			</Slide>
			<Slide>
				<h1> Example 2 </h1>
				<a href="https://codesandbox.io/embed/jz9l97qn89"><img alt="img2" src={img2} style={{ 'margin-left': '30vw' }}/></a>
			</Slide>
			<Slide>
				<h1> Example 3 </h1>
				<a href="https://codesandbox.io/embed/kky7yk087v"><img alt="img3" src={img3} style={{ 'margin-left': '30vw' }}/></a>
			</Slide>
			<Slide>
				<h1> Example 4 </h1>
				<a href="https://codesandbox.io/embed/ly0oxkp899"><img alt="img4" src={img4} style={{ 'margin-left': '30vw', 'height': '350px'}}/></a>
			</Slide>
			<Slide>
				<h1> Example 5 </h1>
				<a href="https://codesandbox.io/embed/9y8vkjykyy"><img alt="img5" src={img5} style={{ 'margin-left': '30vw' }}/></a>
			</Slide>
			<Slide>
				<h1> Example 6 </h1>
				<a href="https://codesandbox.io/embed/y3j31r13zz"><img alt="img6" src={img6} style={{ 'margin-left': '30vw' }}/></a>
			</Slide>
		</Slideset>
		<Slideset i={1}>
			<Slide>
				<h1> Code </h1>
				<Highlight className='JavaScript'>
			   {
					"import React, { useState } from 'react'\n" +
					"import * as THREE from 'three/src/Three'\n" +
					"import { Canvas } from 'react-three-fiber'"
				}
				</Highlight>
			</Slide>
			<Slide>
				<Highlight className='JavaScript'>
{`<Canvas>
	<Thing vertices={[[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]]} />
</Canvas>`}
				</Highlight>
			</Slide>
			<Slide>
				<Highlight className="JavaScript leftAlign">
{`const Thing = ({ vertices, color }) => {
  const [ materialColor, setMaterialColor ] = useState('peachpuff');
  return <group>
    <line>
      <geometry
        attach="geometry"
        vertices={vertices.map(v => new THREE.Vector3(...v))}
        onUpdate={self => (self.verticesNeedUpdate = true)}
        />
      <lineBasicMaterial attach="material" color="black" />
    </line>
    <mesh
      onClick={() => setMaterialColor('peachpuff')}
      onPointerOver={() => setMaterialColor('grey')}
      onPointerOut={() => setMaterialColor('peachpuff')}>
      <octahedronGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={materialColor} opacity={0.5} transparent />
    </mesh>
  </group>;
};`}
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
		<footer>
			<Location withPathname={true} />
			<SlideInfo />
		</footer>
	</Presentation>;

export default App;
