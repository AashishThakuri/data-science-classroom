import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { BookOpen, FolderGit2, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome to KUCLASSROOM
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your comprehensive platform for Data Science, Bioinformatics, and Biotechnology education. 
            Access course materials, collaborate with peers, and explore curated resources.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          {/* Virtual Classrooms */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Virtual Classrooms</h2>
            </div>
            <p className="text-muted-foreground">
              Interactive learning spaces where teachers can share resources and engage with students in real-time.
            </p>
          </div>

          {/* Resource Library */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Resource Library</h2>
            </div>
            <p className="text-muted-foreground">
              Access a curated collection of learning materials, research papers, and educational content.
            </p>
          </div>

          {/* Project Repository */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <FolderGit2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Project Repository</h2>
            </div>
            <p className="text-muted-foreground">
              Explore semester-wise projects with detailed solutions and explanations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
