import { parseRawText } from "@/lib/tesseract/parser"

const handleImageText = async (textFromTesseract: string) => {
  const parsed = parseRawText(textFromTesseract)
  console.log("整形済み JSON:", parsed)
}