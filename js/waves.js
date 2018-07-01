/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	var page_2 = scrollMonitor.create( document.querySelector('#test') );
	var hero = scrollMonitor.create( document.querySelector('.hero') );
	var hero_trigger = scrollMonitor.create( document.querySelector('#hero-trigger') );

	const DOM = {};
	DOM.hero = document.querySelector('.hero');
	DOM.shape = DOM.hero.querySelector('svg.shape');
	DOM.path = DOM.shape.querySelector('path');
	DOM.enter = document.querySelector('.enter');
	
	charming(DOM.enter);
	DOM.enterLetters = Array.from(DOM.enter.querySelectorAll('span'));
	// Set the SVG transform origin.
	DOM.shape.style.transformOrigin = '50% 0%';

	const init = () => {
		imagesLoaded(document.body, {background: true} , () => document.body.classList.remove('loading'));
		DOM.enter.addEventListener('mouseenter', enterHoverInFn);
		DOM.enter.addEventListener('mouseleave', enterHoverOutFn);
		window.resize = function() {
			scrollMonitor.update();
			scrollMonitor.recalculateLocations();
		}
	};

	page_2.enterViewport(function(event) {
		anime({
			targets: DOM.hero,
			duration: 1000,
			easing: 'easeInOutSine',
			translateY: '-100vh'
		});
		
		anime({
			targets: DOM.shape,
			scaleY: [
				{value:0.5,duration: 550,easing: 'easeInOutCubic'},
				{value:1,duration: 550, easing: 'easeInOutCubic'}
			]
		});
		anime({
			targets: DOM.path,
			duration: 1000,
			easing: 'easeInOutQuad',
			d: DOM.path.getAttribute('pathdata:id')
		});
		anime({
			targets: '#test',
			duration: 1000,
			delay:500,
			easing: 'easeOutCubic',
			translateY: '-15vw',
			opacity: [
				{value: 1, duration: 1000, easing: 'linear'}
			],
		})
	})

	hero.fullyEnterViewport(function(event) {
		anime({
			targets: '#test',
			duration: 500,
			easing: 'easeInCubic',
			translateY: '0',
			opacity: [
				{value: 0, duration: 500, easing: 'linear'}
			],
		})
		anime({
			targets: DOM.hero,
			duration: 1000,
			easing: 'easeInOutCubic',
			translateY: '0'
		});
		
		anime({
			targets: DOM.shape,
			scaleY: [
				{value:1,duration: 550,easing: 'easeInOutCubic'},
				{value:0,duration: 550, easing: 'easeInOutCubic'}
			]
		});

		anime({
			targets: DOM.path,
			duration: 1100,
			easing: 'easeInOutSine',
			d: DOM.path.getAttribute('pathdata:id')
		});
	})

	let isActive;
	let enterTimeout;

	const enterHoverInFn = () => enterTimeout = setTimeout(() => {
		isActive = true;
		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i) => i*15,
			translateX: [
				{value: 1, duration: 150, easing: 'easeInQuad'},
				{value: [-1,0], duration: 150, easing: 'easeOutQuad'}
			],
			opacity: [
				{value: 0, duration: 150, easing: 'linear'},
				{value: 1, duration: 150, easing: 'linear'}
			],
			color: {
				value: '#E81515',
				duration: 1,
				delay: (t,i,l) => i*15+150
			}
		});
	}, 50);

	const enterHoverOutFn = () => {
		clearTimeout(enterTimeout);
		if( !isActive ) return;
		isActive = false;

		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i,l) => (l-i-1)*15,
			translateX: [
				{value: 1, duration: 150, easing: 'easeInQuad'},
				{value: [-1,0], duration: 150, easing: 'easeOutQuad'}
			],
			opacity: [
				{value: 0, duration: 150, easing: 'linear'},
				{value: 1, duration: 150, easing: 'linear'}
			],
			color: {
				value: 'inherit',
				duration: 1,
				delay: (t,i,l) => (l-i-1)*15+150
			}
		});
	};

	init();
};