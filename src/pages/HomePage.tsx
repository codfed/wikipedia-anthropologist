export default function HomePage() {
  return (
    <>
      <h3>Wikipedia is the World's quick-reference guide</h3>
      <p>
        Wikipedia is maintained by a very diverse group of volunteers. Some are
        passionate about subjects and want to not only share their knowledge,
        but also protect the curious public from misinformation. The majority of
        editors are motivated purely by passion for a subject. Others may
        contribute for financial or political reasons. Then... some are just
        trolls who are motivated by their own understanding of comedy.
      </p>
      [Autoblocked](Wikipedia:Autoblock)
      <a href="https://en.wikipedia.org/wiki/Wikipedia:Autoblock">
        AutoBlocked
      </a>
      <h3>Blocks</h3>
      <h5>Types of edits worth looking into</h5>
      <ul>
        <li>Stock market manipulation</li>
        <li>SEO manipulation</li>
        <li>Political propaganda</li>
        <li>Accepted bias</li>
        <li>Trolling</li>
        <li>Image gallery search</li>
        <li>User profile page with data visualization</li>
      </ul>
      <h5>Pages to create</h5>
      <ul>
        <li>User profile page with data visualization</li>
        <li>Figure out routes</li>
      </ul>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th scope="col">Stat</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of articles</td>
            <td>6,341,000</td>
          </tr>
          <tr>
            <td>New articles per day</td>
            <td>541</td>
          </tr>
          <tr>
            <td>Active editors past 30 days</td>
            <td>123,070</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <sup>Wikipedia Stats as of Nov 18, 2023</sup>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
