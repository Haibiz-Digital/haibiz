function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function extractImageUrl(description) {
    // Regular expression to match the src attribute of the img tag
    const imgTagRegex = /<img[^>]*src="([^"]*)"[^>]*>/;
    const match = description.match(imgTagRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

async function getBlogs() {
    const blogContent = (await (await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@haibizdigital")).json()).items



    const blogContainer = document.getElementById('blog-cont')
    blogContent.map((value, index) => {


        //console.log(value)
        let dateString = value.pubDate;
        let date = new Date(dateString).getTime();
        readableDate = formatDate(date)
        let imageUrl = extractImageUrl(value.description)
        blogContainer.innerHTML += `  <a href=${value.link} target="_blank">
        <div class="image-card">
          <img src="${imageUrl}"
            alt="blog">
          <div class="blog-card-title">
            <p>${readableDate}</p>
            <h2>${value.title}</h2>
          </div>
        </div>  
      </a>`
    })


}

getBlogs()