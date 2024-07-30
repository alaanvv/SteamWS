<div align='center'>
  
  # SteamWS

  If you ever tried to make your  
  steam profile prettier, I'm sure  
  you tried adding those Workshop  
  Showcase Gifs, and realized they're so f* hard to do  
  Actually not working in vercel  

  <img width='50%' src='https://raw.githubusercontent.com/alaanvv/Image-Database/main/SteamWS/sws.png'>
</div>

---

- Use this Webapp, uploading your gif
- Unzip your file
- Open [this steam link](https://steamcommunity.com/sharedfiles/edititem/767/3/#)
- Fill all that stuff (for each image generated)
- Before posting, press F12, go to `Console` tab, and place this code:
 ``` $J('#ConsumerAppID').val(480),$J('[name=file_type]').val(0),$J('[name=visibility]').val(0); ```
