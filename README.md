## The Golden Rule: 

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1) **Make a drawing of your app. Simple "wireframes"** 
1) **Look at the drawing and name the HTML elements you'll need to realize your vision**
1) **Look at the drawing and imagine using the app. What _state_ do you need to track?** 
1) **For each HTML element ask: Why do I need this? (i.e., "we need div to display the results in")** 
1) **Once we know _why_ we need each element, think about how to implement the "Why" as a "How" (i.e., `resultsEl.textContent = newResults`)**
1) **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change? Does any DOM update?**
1) **Think about how to validate each of your features according to a Definition of Done. (Hint: console.log usually helps here.)**
1) **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:
- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model. 
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need? 
  - What are the key/value pairs? 
  - What arrays might you need? 
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be resused?)


![wireframe](assets/wireframe.png)

To Dos:
1. HTML shell - done
  - outline below
2. eventListeners
  - CPU input
  - img click to hit goblin
  - goblin divs render an image to fight
3. Utility Functions
  - render active cpus
  - render defeated cpus
4. DOM Updates
  - CPU image
  - User Image
  - CPU health
  - User health

HTML:
1. Div - Inputs and Health
  1. Section
    - h4 user health
  2. Section
    - h4 cpu health
  3. Section
    - form
      - input
      - select
      - button
2. Div - Game Action
  1. Section - user info
    - h3 - user name
    - img - cpu img
  2. Section
    - h3 - cpu name
    - img - cpu img
  3. Section
    - Div - opponent card
      - p - name
      - p - health
3. Div - defeated CPU
  1. Div - opponent card
    - p - name
    - p - health


Stretch Goals Below:
