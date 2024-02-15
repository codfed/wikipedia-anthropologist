import RevisionDifference from '../components/RevisionDifference';
import UserLink from '../components/UserLink';

export default function HomePage() {
  return (
    <>
      <h3>Wikipedia is the World's quick-reference guide</h3>
      <p>
        Wikipedia content is created, edited, and moderated by a diverse group
        of volunteers. Some are passionate about subjects and want to not only
        share their knowledge, but also protect the public from misinformation.
        The majority of editors are motivated purely by passion for a subject.
        Others may contribute for financial or political reasons. Then... some
        are just trolls who are motivated by their own brand of comedy.
      </p>

      <h4>Explore with me</h4>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th scope="col">Page</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="/wikipedia-anthropologist/#/blocks">Blocked Users</a>
            </td>
            <td>
              When users abuse Wikipedia they get blocked. Some of these are
              straight forward but many of them require a tribunal. You can
              filter this list by Vandalism, Promotion, and Sock Puppetry (when
              one person creates multiple accounts to agree with themselves){' '}
            </td>
          </tr>
          <tr>
            <td>
              <a href="/wikipedia-anthropologist/#/edits">Edits</a>
            </td>
            <td>See the latest edits made site wide</td>
          </tr>
          <tr>
            <td>User Breakdown</td>
            <td>
              View live stats, contributions, and block status. These can be
              accessed with the{' '}
              <span className="wa-theme-color">green links</span> in the Edits
              and Blocked Users pages.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Noteable blocks</h3>

      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Vandalism Severity</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <UserLink username={'Woodrow Wilson 15'} />
            </td>
            <td>Gentle Mischief</td>
            <td>
              <div className="noteable-description">
                Uploaded pictures of his friends on random pages including the
                Pacific Northwest Exhibit A:
                <img src="images/WoodrowWilson15Contrib.png"></img>
              </div>
            </td>
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
