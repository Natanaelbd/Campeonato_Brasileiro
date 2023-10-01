sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
                /* var dadosGerais = {
                    nomeCampeonato : "Brasileirão 2023",
                    rodada : 99
                }

                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                
                var tela = this.getView();
                tela.setModel(dadosModel, "ModeloDadosGerais"); */

                // definir objetos novos - consumo API
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                // 3 novos modelos

                var dadosModel = new JSONModel();
                var classificacaoModel = new JSONModel();
                var partidasModel = new JSONModel();

                // colocando dados dentro dos modelos

                dadosModel.setData(dadosGerais);
                classificacaoModel.setData(classificacao);
                partidasModel.setData(partidas);

                // atribuir modelos na tela
                var tela = this.getView();
                tela.setModel(dadosModel, "ModeloDadosGerais");
                tela.setModel(classificacaoModel, "ModeloTabela");
                tela.setModel(partidasModel, "ModeloPartidas");

                //chamanda da função
                this.onBuscarClassificacao(); 
                this.onBuscarDadosGerais();   

            },

            onBuscarClassificacao: function(){
                var oModeloTabela = this.getView().getModel("ModeloTabela");

                var configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain : true,
                    headers:{
                        "Authorization": "API_KEY"
                    }
                };
                
                // chamada da API usando AJAX
                $.ajax(configuracoes).done(
                    function(response){
                        
                        // mudar os dados do model
                        oModeloTabela.setData(
                            {
                                "Classificacao" : response
                            }

                        );
                        
                    }.bind(this)
                )

            },

            onBuscarDadosGerais: function(){
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");

                var configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain : true,
                    headers:{
                        "Authorization": "API_KEY"
                    }
                };
                
                // chamada da API usando AJAX
                $.ajax(configuracoes).done(
                    function(response){
                          
                        // mudar os dados do model
                        oModeloDadosGerais.setData(response);

                        var rodadaAtual = response.rodada_atual.rodada;

                        this.onBuscarPartidas(rodadaAtual);
                        
                    }.bind(this)
                )

            },

            onBuscarPartidas: function(rodadaAtual){
                var oModeloPartidas = this.getView().getModel("ModeloPartidas");

                var configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    method: "GET",
                    async: true,
                    crossDomain : true,
                    headers:{
                        "Authorization": "API_KEY"
                    }
                };
                
                // chamada da API usando AJAX
                $.ajax(configuracoes).done(
                    function(response){
                          
                        // mudar os dados do model
                        oModeloPartidas.setData(response);
                        
                    }.bind(this)
                )

            }

        });
    });
