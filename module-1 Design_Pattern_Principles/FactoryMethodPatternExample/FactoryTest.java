
public class FactoryTest {

    public static void main(String[] args) {
        DocumentFactory WordFac = new WordDocumentFactory();
        Document word = WordFac.createDocument();
        word.open();

        DocumentFactory PdfFac = new PdfDocumentFactory();
        Document pdf = PdfFac.createDocument();
        pdf.open();

        DocumentFactory ExcelFac = new ExcelDocumentFactory();
        Document excel = ExcelFac.createDocument();
        excel.open();
    }
}
