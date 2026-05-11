import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

const DATA_FILE = join(__dirname, 'videos.json');

const defaultVideos = [
  {
    id: '1',
    title: '示例视频 1',
    description: '这是一个示例视频',
    category: 'movie',
    duration: '00:05:00',
    coverUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
    videoUrl: '',
    uploadTime: new Date().toISOString(),
    views: 100
  }
];

let videos = [];

try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    videos = JSON.parse(data);
  } else {
    videos = defaultVideos;
    saveVideos();
  }
} catch (error) {
  console.error('加载视频数据失败:', error);
  videos = defaultVideos;
}

function saveVideos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${uuidv4()}.${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }
});

app.get('/api/videos', (req, res) => {
  res.json(videos);
});

app.get('/api/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: '视频不存在' });
  }
  res.json(video);
});

app.post('/api/videos/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请上传视频文件' });
    }

    const { title, description, category } = req.body;
    
    const newVideo = {
      id: uuidv4(),
      title: title || '未命名视频',
      description: description || '',
      category: category || 'movie',
      duration: '00:00:00',
      coverUrl: `https://picsum.photos/seed/${Date.now()}/800/450`,
      videoUrl: `/uploads/${req.file.filename}`,
      uploadTime: new Date().toISOString(),
      views: 0
    };

    videos.push(newVideo);
    saveVideos();

    res.json({
      success: true,
      video: newVideo
    });
  } catch (error) {
    console.error('上传失败:', error);
    res.status(500).json({ error: '上传失败' });
  }
});

app.delete('/api/videos/:id', (req, res) => {
  try {
    const videoIndex = videos.findIndex(v => v.id === req.params.id);
    if (videoIndex === -1) {
      return res.status(404).json({ error: '视频不存在' });
    }

    const video = videos[videoIndex];
    
    if (video.videoUrl && video.videoUrl.startsWith('/uploads/')) {
      const filePath = join(__dirname, video.videoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    videos.splice(videoIndex, 1);
    saveVideos();

    res.json({ success: true });
  } catch (error) {
    console.error('删除失败:', error);
    res.status(500).json({ error: '删除失败' });
  }
});

app.post('/api/videos/:id/views', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (video) {
    video.views += 1;
    saveVideos();
    res.json({ success: true, views: video.views });
  } else {
    res.status(404).json({ error: '视频不存在' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📹 视频上传端点: POST http://localhost:${PORT}/api/videos/upload`);
  console.log(`📋 视频列表端点: GET http://localhost:${PORT}/api/videos`);
});
