package trabsisweb.trabsisweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    private static final String UPLOAD_DIR = "src/main/resources/static/img/";

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    @PostMapping
    public Produto adicionarProduto(
            @RequestParam("nome") String nome,
            @RequestParam("categoria") String categoria,
            @RequestParam("preco") double preco,
            @RequestParam("imagem") MultipartFile imagem) throws IOException {

        String nomeImagem = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
        Path caminhoImagem = Paths.get(UPLOAD_DIR + nomeImagem);
        Files.write(caminhoImagem, imagem.getBytes());

        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setCategoria(categoria);
        produto.setPreco(preco);
        produto.setImagem(nomeImagem);

        return produtoRepository.save(produto);
    }
}