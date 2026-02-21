import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import MenuSection from "../components/MenuSection"
import GallerySection from "../components/GallerySection"
import ContactSection from "../components/ContactSection"

export default function Home({ content }: any) {
  return (
    <>
      <Hero content={content} />
      <AboutSection content={content} />
      <MenuSection content={content} />
      <GallerySection />
      <ContactSection content={content} />
    </>
  )
}