const DOMAIN_NAME = "example.com"

export function handler(event) {
    const request: CloudFrontRequest = event.request;
    const uri = request.uri

    const last_uri_segment = (_ => {
        const arr = uri.split("/")
        return "/" + arr[arr.length - 1]
    })()

    // .html付きリクエストの正規化
    const match_html = /\.html$/g
    if (match_html.test(last_uri_segment)) {
        const new_uri = replace_last_uri_segment(uri, "")
        const redirect_url = `https://${DOMAIN_NAME}${new_uri}`

        const response: CloudFrontResponse = {
            statusCode: 301,
            statusDescription: "Permanent Redirect",
            headers: {
                location: { value: redirect_url }
            }
        }

        return response
    }

    // .html以外の拡張子付きリクエスト
    const match_fileextention = /\.([a-z]||\d)+$/g
    if (match_fileextention.test(last_uri_segment)) {
        return request
    }

    // Forwarding
    const match_dir = /\/$/g
    if (match_dir.test(last_uri_segment)) {
        request.uri = replace_last_uri_segment(uri, "index.html")
    } else {
        request.uri += ".html"
    }
    return request;
}

function replace_last_uri_segment(uri: string, replace_segment: string): string {
    const uri_segment_arr = uri.split("/")
    uri_segment_arr[uri_segment_arr.length - 1] = replace_segment
    return uri_segment_arr.join("/")
}

type CloudFrontRequest = {
    method: string,
    uri: string,
    headers: object
}

type CloudFrontResponse = {
    statusCode: number,
    statusDescription: string,
    headers: {
        "location": { "value": string }
    }
}