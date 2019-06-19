<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
	<xsl:output method="html" indent="yes" />
	<xsl:template match="/">

		<div class="nama-tietkiem-ct-8">
			<div class="container">
				<div class="main-title">
					<h2>
						<xsl:value-of disable-output-escaping="yes" select="/NewsList/ModuleTitle"></xsl:value-of>
					</h2>
				</div>
				<div class="list-item">
					<div class="row">
						<xsl:apply-templates select="/NewsList/News"></xsl:apply-templates>
					</div>
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="News">
		<div class="col-lg-4 item">
			<figure>
				<div class="icon">
						<a style="color: inherit">
						<xsl:attribute name="href">
							<xsl:value-of select="BriefContent"></xsl:value-of>
						</xsl:attribute>
						<img class='lazyload blur-up'>
						<xsl:attribute name='data-src'>
							<xsl:value-of select='ImageUrl'></xsl:value-of>
						</xsl:attribute>
						<xsl:attribute name='alt'>
							<xsl:value-of select='Title'></xsl:value-of>
						</xsl:attribute>
						<xsl:attribute name='title'>
							<xsl:value-of select='Title'></xsl:value-of>
						</xsl:attribute>
						</img>
					</a>
				</div>
				<figcaption>
					<h5>
						<a style="color: inherit">
							<xsl:attribute name="href">
								<xsl:value-of select="BriefContent"></xsl:value-of>
							</xsl:attribute>
							<xsl:value-of disable-output-escaping='yes' select='Title'></xsl:value-of>
						</a>
						<xsl:value-of select='EditLink' disable-output-escaping='yes'></xsl:value-of>
					</h5>
					<p>
						<xsl:value-of disable-output-escaping='yes' select='SubTitle'></xsl:value-of>
					</p>
				</figcaption>
			</figure>
		</div>
	</xsl:template>
</xsl:stylesheet>