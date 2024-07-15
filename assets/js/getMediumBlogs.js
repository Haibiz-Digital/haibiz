function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
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

const api = 'https://proxy-server-j661.onrender.com/?link=https://medium.com/feed/@haibizdigital'
//const api = 'http://127.0.0.1:3000/?link=https://medium.com/feed/@haibizdigital'

async function getBlogs() {
    const blogContent = (await (await fetch(api)).json()).items
    console.log(blogContent)

    if(blogContent.length > 0){
        document.getElementById("loader").style.display="none"
    }


    const blogContainer = document.getElementById('blog-cont')
    blogContent.map((value, index) => {


        //console.log(value)
        let dateString = value.pubDate;
        let date = new Date(dateString).getTime();
        readableDate = formatDate(date)
        let imageUrl = extractImageUrl(value["content:encoded"])
        blogContainer.innerHTML += `  <a href=${value.guid} target="_blank">
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