## My reflections

Initially I was checking EmberJS documentation to refresh my memory and learn about updates. Then I started to build my way. Mostly I used EmberJs official documentation and GH Copilot.

### Challenges I faced

- At first I was considering to use 3rd party package for Material design. After some research, I saw that integrating with Material Design with an existing package has some problems on Ember side.
I saw, there are some packages like `ember-paper` but some was not compatible with newest versions of ember-cli or some are not being maintained anymore for example `https://github.com/mike1o1/ember-material-design`. So decided to trust myself to write my own components. Then I decided to use tailwind. Why? Because for me it's helping a lot when it comes timing. Only downside for me was, I had to write my own toast service since 3rd party libraries mostly not allowing you to manipulate UI which resulting inconsistencies in UI perspective.

- At some point after adding new packages, the file watching started being slow. So I saw `https://cli.emberjs.com/release/basic-use/#installingwatchman` and then after installing file watching was fine.

- While implementing AI opponent, there was re-rendering challenge. Board is being stored in a string array and updating only board wont trigger re-render even if annotated as `@tracked`. So for only `play-with-ai` section, I had to convert string array into array of objects. I left older version in play controller. It might seem file is duplicated but it's intentional.

- State management was tough. I had few challenges while storing scores and first playing player selection. 
One of the problems is when we navigate back and forward between landing and play pages, I know that I had to store state in context. I tried to implement a `gameContextService` which was working fine at some point. There were some buggy cases while navigation, so I decided to store scores and first playing player in localStorage. I am aware that it introduced a leak, where user is able to change selected player (X or O) while playing from localStorage but decided to keep it.

- In the first implementation, when user clicks any square I was updating the board array where I am storing played X's and O's positions. Then I saw that if client machine performance is low, a glitch happening. Since all squares depend on the board array, they all re-render when any square is clicked. Then I stop tracking board and make each square manage its own state. Instead of storing the entire board in the controller, you can store only the initial state of the board

- I was using `.png` images for players in the board. After deploying to `netlify`, I saw that images are being loaded & rendered slowly, then I thought using svgs but then I saw iconify project with lots of icons in it,  also icon data is cached in localStorage. (you can see it if you open localStorage). So I decided to use it.

## Improvements in my mind

- If we want to keep `play against AI` feature in the project we have to write backend side, because my OpenAI api key is being exposed in meta tags and in request headers, so I was revoking repeatedly after completing test sessions.

- I want to write a websocket to support multiple player game online, like play online option.

- Backdrop should be improved because it's not covering whole screen for example if we open developer tools. It is resulting possible interference from real player while playin against AI

- I want to improve UI/UX a bit, like;
    - Not covering whole screen while AI is thinking, to allow real player to think in the mean time (general approach for writing games, in my mind)
    - Considering responsiveness, especially for mobile since most of the time people tend to play games from mobile devices.

## Enjoy moments for me

- I have used EmberJS in my current company for a while then I successfully done the migration to ReactTS. Remembering some memories and seeing how it updated (EmberJS) made me smile.

- Adopting openAI as bot player was very cool journey, I felt like it increased product's value, which is cool.

- While testing, I researched whether there is a buggy cases in tic-tac-toe game. Then I found one situation that could be considered "buggy" or unusual in some way. Trying to cover a crucial edge case was cool.
