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

const api = 'https://proxy-server-j661.onrender.com/?link=https://medium.com/feed/@haibizdigital'

async function getBlogs() {
    const blogContent = (await (await fetch(api)).json()).items
    //console.log(blogContent)

    if(blogContent.length > 0){
        document.getElementById("loader").style.display="none"
    }


    const blogContainer = document.getElementById('blog-cont')
    blogContent.map((value, index) => {


        //console.log(value)
        let dateString = value.date_published;
        let date = new Date(dateString).getTime();
        readableDate = formatDate(date)
        let imageUrl = extractImageUrl(value.content_html)
        blogContainer.innerHTML += `  <a href=${value.url} target="_blank">
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