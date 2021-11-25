const Post = require('../models/Post');

const random = require('../utils/slugNumbers');

module.exports = {
  postController: {
    creat: (req, res) => {
      let user = req.user;
      Post.create({
        autor: user.name,
        email: user.email,
        foto: user.picture,
        titulo: req.body.titulo,
        slug: slugify(req.body.titulo + - + random(), {
          lower: true,
        }),
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        publicado: req.body.publicado,
        editado: req.body.editado,
        id_user: user.sub,
      })
        .then(() => {
          req.flash("success_msg", "Publicado com sucesso :)");
          res.redirect(`/perfil`);
        })
        .catch(() => {
          req.flash(
            "erro_msg",
            " Houve um erro, não foi possível fazer a publicação:("
          );
          res.redirect(`/cad`);
        });
    },

    update: (req, res) => {
      const id = req.params.id;

      Post.update(req.body, {
        where: {
          id: id,
        },
      })
        .then(() => {
          req.flash("success_msg", "Atualizado com sucesso :)");
          res.redirect(`/perfil`);
        })
        .catch(() => {
          req.flash(
            "erro_msg",
            " Houve um erro, não foi possível fazer a publicação:("
          );
          res.redirect(`/edit/:id`);
        });
    },
    delete: (req, res) => {
      Post.destroy({
        where: {
          slug: req.params.id,
        },
      })
        .then(() => {
          res.redirect(`/perfil`);
        })
        .catch(function (erro) {
          res.send("Erro ao deletar posategem!" + erro);
        });
    },
    showPost: (req, res) => {
      Post.findAll({
        where: {
          slug: req.params.slug,
          publicado: true
        }
      })
        .then(function (post, comments) {
          res.render("posts", {
            posts: post,
            comments: comments
          });
        });
    },
    showEditPost: (req, res) => {
      Post.findAll({
        where: {
          id: req.params.id,
        },
      }).then((post, user) => {
        user = req.user;
        res.render("edit", {
          edit: post,
          info: {
            user,
          },
        });
      });
    },
    showPereviewPost: (req, res) => {
      Post.findAll({
        where: {
          slug: req.params.slug,
        },
      }).then(function (post) {
        res.render("posts", {
          posts: post,
        });
      });
    }
  }
};