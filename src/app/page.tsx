import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import MenuBar from '../../components/menuBar/MenuBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <MenuBar />
    </main>
  )
}
