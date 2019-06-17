<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
    <xsl:output method="html" indent="yes" />
    <xsl:template match="/">
        <div class="nama-breadcrumb">
            <xsl:apply-templates select="/ProductDetail/ProductImages"></xsl:apply-templates>
        </div>

        <div class="nama-navigation-1">
            <div class="list-page">
                <div class="container">
                    <div class="mobile-navigation">
                        <p>
                            <xsl:value-of disable-output-escaping="yes" select="/ProductDetail/MenuText"></xsl:value-of>
                        </p>
                    </div>
                    <ul>
                        <xsl:apply-templates select="/ProductDetail/ProductAttributes" mode="nav"></xsl:apply-templates>
                    </ul>
                </div>
            </div>
        </div>

        <section class="nama-internet-banking-1" id="section-1">
            <div class="container">
                <xsl:value-of select='/ProductDetail/EditLink' disable-output-escaping='yes'></xsl:value-of>
                <xsl:apply-templates select='/ProductDetail/ProductAttributes' mode="Frame1"></xsl:apply-templates>
            </div>
        </section>
        <section class="nama-internet-banking-2" id="section-2"
            bg-img="/Data/Sites/1/media/default/img/internet-banking/bg-1.png" bg-size="auto">
            <div class="container">
                <xsl:apply-templates select='/ProductDetail/ProductAttributes' mode="Frame2"></xsl:apply-templates>
            </div>
        </section>
        <section class="nama-internet-banking-3" id="section-3">
            <div class="container">
                <xsl:apply-templates select='/ProductDetail/ProductAttributes' mode="Frame3"></xsl:apply-templates>
            </div>
        </section>
        <section class="nama-internet-banking-4" id="section-4"
            bg-img="/Data/Sites/1/media/default/img/internet-banking/bg-2.png">
            <div class="container">
                <div class="main-wrapper">
                    <xsl:apply-templates select='/ProductDetail/ProductAttributes' mode="Frame4"></xsl:apply-templates>
                </div>
            </div>
        </section>

    </xsl:template>

    <xsl:template match="ProductAttributes" mode="nav">
        <li>
            <xsl:if test="position() = 1">
                <xsl:attribute name="class">
                    <xsl:text>active</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <a>
                <xsl:attribute name="data-link">
                    <xsl:text>section-</xsl:text>
                    <xsl:value-of disable-output-escaping="yes" select="position()"></xsl:value-of>
                </xsl:attribute>
                <xsl:attribute name="title">
                    <xsl:value-of select="Title"></xsl:value-of>
                </xsl:attribute>
                <xsl:value-of disable-output-escaping="yes" select="Title"></xsl:value-of>
            </a>
        </li>
    </xsl:template>


    <xsl:template match="ProductAttributes" mode="Frame1">
        <xsl:if test="position() = 1">
            <div class="main-title">
                <h2>
                    <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                </h2>
            </div>
            <div class="row">
                <xsl:value-of disable-output-escaping='yes' select='Content'></xsl:value-of>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="ProductAttributes" mode="Frame2">
        <xsl:if test="position() = 2">
            <div class="main-title">
                <h2>
                    <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                </h2>
            </div>
            <div class="row">
                <xsl:value-of disable-output-escaping='yes' select='Content'></xsl:value-of>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="ProductAttributes" mode="Frame3">
        <xsl:if test="position() = 3">
            <div class="main-title">
                <h2>
                    <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                </h2>
            </div>
            <xsl:value-of disable-output-escaping='yes' select='Content'></xsl:value-of>
        </xsl:if>
    </xsl:template>

    <xsl:template match="ProductAttributes" mode="Frame4">
        <xsl:if test="position() = 4">
            <div class="main-title white">
                <h2>
                    <xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
                </h2>
            </div>
            <div class="desc">
                <xsl:value-of disable-output-escaping='yes' select='Content'></xsl:value-of>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="ProductImages">
        <div class="nama-banner">
            <img class="lazyload blur-up">
            <xsl:attribute name="data-src">
                <xsl:value-of disable-output-escaping="yes" select="ImageUrl"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:value-of select="Title"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="title">
                <xsl:value-of select="Title"></xsl:value-of>
            </xsl:attribute>
            </img>
        </div>
    </xsl:template>
</xsl:stylesheet>