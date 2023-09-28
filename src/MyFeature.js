// Implementing a monolithic feature that displays, adds and deletes articles.
// The aim is to display the complexity and inutility in implementing
// a feature that only consists of a single monolithic class component,
// as oppose to refactoring it to functional components,
// implementing the state at only the top level,
// and providing separate smaller utility and feature components
// that can be used elsewhere as well, and not just confined
// to this feature solely.
// Stuied and implemented from React-and-React-Native-4th-Edition.

import React from "react";

// A Generative Function that creates a unique ID at every yield of a while loop.
const id = (function* () {
  let i = 1;
  while (true) {
    yield i;
    i += 1;
  }
})();

class MyFeature extends React.Component {
  // Setting Inital Comoponent state
  state = {
    articles: [
      {
        id: id.next(),
        title: "Article 1",
        summary: "Article 1 Summary",
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 2",
        summary: "Article 2 Summary",
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 3",
        summary: "Article 3 Summary",
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 4",
        summary: "Article 4 Summary",
        display: "none",
      },
    ],
    title: "",
    summary: "",
  };

  // On Change input event handler functions
  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeSummary = (e) => {
    this.setState({ summary: e.target.value });
  };

  // Add New Article click event handler function
  // Setting the Articles state array to include the new Article Object
  // Resetting the title and summary state values
  onClickAdd = () => {
    this.setState((state) => ({
      articles: [
        ...state.articles,
        {
          id: id.next(),
          title: state.title,
          summary: state.summary,
          display: "none",
        },
      ],
      title: "",
      summary: "",
    }));
  };

  // Remove Article click event handler function
  // Filtering a new state Array to exclude the selected Object using ID
  // Replacing the new Articles state Array in the components' state
  onClickRemove = (id) => {
    this.setState((state) => ({
      ...state,
      articles: state.articles.filter((article) => article.id !== id),
    }));
  };

  // Toggle Display Article event handler function
  // Creating an instance of the state Array to avoid changing the original state values
  // Finding the index of the targeted Article
  // Updating the display value of the object using the new Array instance
  // Replacing the Articles state array with the newly created instance
  // If the display property is set to "none"/true it is set to ""/false and vice-versa
  onClickToggle = (id) => {
    this.setState((state) => {
      const articles = [...state.articles];
      const index = articles.findIndex((article) => article.id === id);

      articles[index] = {
        ...articles[index],
        display: articles[index].display ? "" : "none",
      };
      return { ...state, articles };
    });
  };

  render() {
    // Destructuring the Component State
    const { articles, title, summary } = this.state;

    return (
      <section>
        <header>
          <h1>Articles</h1>
          <input
            placeholder="Title"
            value={title}
            onChange={this.onChangeTitle}
          />
          <input
            placeholder="Summary"
            value={summary}
            onChange={this.onChangeSummary}
          />
          <button onClick={this.onClickAdd}>Add</button>
        </header>
        <article>
          {/* Mapping the Articles array to create an li element for every Article */}
          {/* binding the event handler functions to null at calling, 
              to avoid "this" keyword missuse */}
          {/* assigning the event handler argument in the 2nd bind() parameter */}
          <ul>
            {articles.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  title="Toggle Summary"
                  onClick={this.onClickToggle.bind(null, i.id)}
                >
                  {i.title}
                </a>
                &nbsp;
                <a
                  href={`#${i.id}`}
                  title="Remove"
                  onClick={this.onClickRemove.bind(null, i.id)}
                >
                  &#10007;
                </a>
                <p style={{ display: i.display }}>{i.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    );
  }
}

export default MyFeature;
