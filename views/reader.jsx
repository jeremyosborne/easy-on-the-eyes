var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <title>Easy on the eyes</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link href="/app.css" rel="stylesheet"/>
                </head>
                <body>
                    <form className="nav hide" action="javascript:void(0);">
                        <label for="u">What do you want to read today?</label><br/>
                        <input type="url" name="u" id="u"/>
                        <input type="submit"/>
                        <br/>
                        <div className="starting-points">
                            <p>Some starting points:</p>
                            <ul>
                                <li><a href="https://en.wikipedia.org/wiki/Umberto_Eco">Umberto Eco</a></li>
                                <li><a href="https://en.wikipedia.org/wiki/Sephirot">Sephirot</a></li>
                                <li><a href="https://en.wikipedia.org/wiki/Semantics">Semantics</a></li>
                                <li><a href="https://en.wikipedia.org/wiki/Maternal_insult">"Your Mom..." Jokes</a></li>
                            </ul>
                        </div>
                    </form>


                    <div className="content" dangerouslySetInnerHTML={this.props.content}></div>

                    <script src="/app.js"></script>

                    {this.props.env.NODE_ENV == "production" ? "" : <script src="reload/reload.js"/> }
                </body>
            </html>
        );
    },
});
