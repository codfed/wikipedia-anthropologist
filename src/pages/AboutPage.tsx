export default function AboutPage() {
  return (
    <>
      <p>
        I have always been interested in the human element behind Wikipedia. In
        October 2023 I started to play around with the Wikipedia API in some
        Jekyll files. I got sick of building tables through javascript to
        display the results. This app started as an experiment to see how React
        handles this task.
      </p>

      <p>
        Turns out React handles it pretty well. I quickly got the Blocks page
        loading the 500 most recent block users. Then I implemented filters so
        you could easily find just the vandals, or the promotional accounts.
      </p>

      <p>
        Then I wanted the site to look more cohesive and thought out so I went
        to&nbsp;
        <a
          className="App-link"
          href="https://codfed.github.io/github-pages-with-docker/2023/11/20/creating-wikipedia-anthropologist-logo-using-midjourney.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mid-Journey to make a proper logo
        </a>
        .
      </p>
      <a
        className="App-link"
        href="https://codfed.github.io/github-pages-with-docker/"
        target="_blank"
        rel="noopener noreferrer"
      >
        This was the work leading up to this.
      </a>
    </>
  );
}
