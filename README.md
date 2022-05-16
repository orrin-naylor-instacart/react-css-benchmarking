#Reduce react render time by half using this one weird trick

TLDR; Emotion css is doubling our render times. The recommendation, migrate to precomputed styles.

##Background
Some pieces of the ads-web dashboard take over 1 second to render. This has resulted in jank when altering filters, selecting a new chart metric, sorting the data table, and transitioning between loading and loaded states. 

(For non FE folks jank is a short freeze. It happens when the main thread is blocked.)

The worst freeze happens when the datatable receives its initial data. The profile below shows a 1.2s render time. (For fairness, the profiler does slow things down, so it’s not quite this bad)
<img width="862" alt="Screen Shot 2022-05-15 at 3 55 21 PM" src="https://user-images.githubusercontent.com/87036318/168660505-657d5fd1-f544-4d83-b950-6625106ddcd3.png">

While experimenting with ways to improve the table performance we tried removing emotion css. Removing just three css props cut the render time in half. 
Before: Using emotion css prop
![Screen Shot 2022-05-12 at 11 32 47 PM](https://user-images.githubusercontent.com/87036318/168660609-bd11d1a2-3536-4289-b208-36f20c9f23e9.png)

After: Using style prop
![Screen Shot 2022-05-12 at 11 35 35 PM](https://user-images.githubusercontent.com/87036318/168660627-14409643-5240-4049-8881-45fc69af5ec3.png)

##Analysis
Wanting to make sure this improvement wasn’t some due to some fluke, we decided to profile several css libraries.

##Methodology
For 6 frameworks, and a control we did the following
- Created a mock dashboard that renders a 15 x 20 table, then rerenders it, then removes it, and repeat. We choose this pattern because creating new things, rerendering them, and removing them are common react actions.
- Rendered an FPS counter on screen. We choses FPS because we wanted to measure how the browser interacted with the framework. If one framework took a little more react render time, but significantly less browser render time it would show up in the data.
- Created a fully optimized production build.
- Served that build with a simple static file server
- Closed all other browser tabs and applications (except vs code, but we closed all files)
- Let the benchmark run for 3 min. This rules out V8 warmup and cpu temp throttling
- Recorded the FPS

Screenshot of the test rig
![Screen Shot 2022-05-14 at 3 36 03 PM](https://user-images.githubusercontent.com/87036318/168660794-f519884b-aa5b-4922-b5fa-885a5eed5d5a.png)

##Results - from worst to best:
- styled-component, initialized inside the render function - 17 fps
- - This appeared to create a memory leak, the FPS was recorded at 3 mins, but was steadily dropping. This should be avoided at all costs.
- emotion css - 77 fps
- - Most commonly used across Instacart
- inline styles (aka styles prop) - 110 fps
- styled-component, initialized outside the render function - 129 fps
- css-modules - 201 fps
- regular css - 208 fps
- no styles (control) - 318 fps
![Screen Shot 2022-05-14 at 5 55 19 PM](https://user-images.githubusercontent.com/87036318/168660912-851c526f-cc20-4042-a306-3870916d78d8.png)

##Conclusion
This document is not intended to propose a migration plan, only to raise awareness. That being said, the recommendation is that Instacart moves from runtime css (emotion, style prop, styled components) to compile time css (regular css or css-modules).
