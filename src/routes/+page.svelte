<script>
	import { onMount } from 'svelte';

	let currentEmotion = '';
	let guessInput = '';

	const emotions = [
		'happy',
		'sad',
		'angry',
		'surprised',
		'disgusted',
		'fearful',
		'confused',
		'excited',
		'bored',
		'loved'
	];

	const emojiMap = {
		happy: ['😀', '😃', '😄', '😁', '😆'],
		sad: ['😔', '😞', '😢', '😓', '😿'],
		angry: ['😠', '😡', '😤', '😣', '😖'],
		surprised: ['😮', '😯', '😲', '😳', '😱'],
		disgusted: ['😷', '😵', '🤢', '🤮', '🤧'],
		fearful: ['😨', '😰', '😱', '😥', '😓'],
		confused: ['😕', '😖', '😐', '🤔', '😵'],
		excited: ['😍', '🤩', '😊', '😁', '🥳'],
		bored: ['😐', '😑', '😪', '🥱', '😒'],
		loved: ['😘', '😍', '😻', '😚', '😙']
	};

	function resetGame() {
		currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
		guessInput = '';
	}

	function checkGuess() {
		const guess = guessInput.trim().toLowerCase();
		if (guess === currentEmotion) {
			alert('Correct! You guessed the emotion!');
			resetGame();
		} else {
			alert("Sorry, that's not correct. Try again!");
		}
	}

	onMount(resetGame);
</script>

<div
	class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-sans"
>
	<div class="flex max-w-4xl w-full">
		<div class="bg-white p-8 rounded-l-2xl shadow-lg text-center w-2/3 animate-fade-in">
			<h1 class="text-4xl font-bold mb-6 text-indigo-600">
				🙃 EmojiGrid: The Emotion Guessing Game 😄
			</h1>
			<div class="grid grid-cols-5 gap-6 mb-8 text-5xl">
				{#each Array(25) as _, i}
					<span
						class="cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
					>
						{#if emojiMap[currentEmotion]}
							{emojiMap[currentEmotion][
								Math.floor(Math.random() * emojiMap[currentEmotion].length)
							]}
						{/if}
					</span>
				{/each}
			</div>
			<input
				type="text"
				bind:value={guessInput}
				placeholder="Enter your guess..."
				class="w-full px-4 py-3 mb-6 text-lg bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
			/>
			<button
				on:click={checkGuess}
				class="px-6 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
				>Guess</button
			>
		</div>
		<div class="bg-white p-8 rounded-r-2xl w-2/3 animate-fade-in prose">
			<h2 class="text-2xl font-bold mb-4 text-center">Instructions</h2>
			<p class="mb-4">
				This is a simple web-based game where you have to guess the emotion represented by a grid of
				emojis. Here's how it works:
			</p>
			<ol class="text-left mb-4">
				<li>
					The game starts by randomly selecting an emotion from a list of emotions and displaying a
					grid of 25 random emojis representing that emotion.
				</li>
				<li>
					Enter your guess for the emotion in the text input field and click the "Guess" button or
					press Enter.
				</li>
				<li>
					If you guessed correctly, an alert is shown with a "Correct!" message, and the game resets
					with a new emotion and a new grid of emojis.
				</li>
				<li>
					If you guessed incorrectly, an alert is shown with a "Sorry, that's not correct. Try
					again!" message, allowing you to try again.
				</li>
			</ol>
		</div>
	</div>
</div>

<style>
	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.5s ease-in-out;
	}
</style>
