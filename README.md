Reduce react FE render time by half using this one weird trick

Author Orrin Naylor

TLDR; Emotion css is doubling our render times. The recommendation, migrate to precomputed styles.

Background.
The ads-web dashboard render time has grown to 300ms. This has resulted in jank when altering some filters. 

(For non FE folks jank is a short freeze. It happens when the main thread is blocked, user events que up till the thread is free. Then all those events are released once the main thread is done computing. This is what's happening when you click something, and nothing happens, so you click again, then all the sudden the thing you clicked acts like it was clicked twice. Also animations freeze, which is uncomfortable if there's a loading animation on the screen.)

This is what a dashboard profile looks like when a user selects a new metric to be displayed on the chart.

The initial click freezes the UI for over 300ms, then two more renders freeze for another 250ms. Finally, the last render freezes the UI for 130ms. Across the 1.5s interval the UI is frozen for 700ms, almost half.

Culprit - emotion css
While experimenting with ways to improve the table performance we experimented with removing emotion css. Removing just three css props cut the render time in half. https://instacart.slack.com/archives/C030C7FAC82/p1652450402757499

Analysis
Wanting to make sure this improvement wasn’t some due to testing on a dev build of some other fluke we set out to benchmark css frameworks

Methodology
For 6 frameworks, and a control we did the following
Created a mock dashboard that renders a 15 x 20 table, then rerenders it, then removes it, and repeat. We choose this pattern because creating new things, rerendering them, and removing them are common react actions.
Rendered an FPS counter on screen. We choses FPS because we wanted to measure how the browser interacted with the framework. If one framework took a little more react render time, but significantly less browser render time it would show up in the data.
Created a fully optimized production build.
Served that build with a simple static file server
Closed all other browser tabs and applications (except vs code, but we closed all the open tabs)
Let the benchmark run for 3 min. This rules out V8 warmup and cpu temp throttling
Recorded the FPS


Intentionally left blank, continues on next page
Results - from worst to best:
styled-component, initialized inside the render function - 17 fps
This appeared to create a memory leak, the benchmark was recorded at 3 mins, but was steadily dropping. I quit watching once it got down to 13 fps
emotion css - 77 fps
Most commonly used across instacart
inline styles (aka styles prop) - 110 fps
styled-component, initialized inside the render function - 129 fps
css-modules - 201 fps
regular css - 208 fps
no styles (control) - 318 fps



Conclusion
As a company instacart should move away from emotion css.
